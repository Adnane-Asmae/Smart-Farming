"""
App Demandes - Views
- Farmer : CRUD sur ses propres demandes (si EN_ATTENTE)
- Admin  : lecture de toutes + valider/refuser
- Technicien : lecture des demandes nécessitant une intervention
"""

from django.utils import timezone
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from smart_farming.permissions import IsAdmin, IsFarmer, IsAdminOrTechnicien, IsAnyRole
from .models import Demande
from .serializers import DemandeSerializer, DemandeCreateSerializer, DemandeTraitementSerializer


class DemandeListCreateView(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsFarmer()]
        return [IsAnyRole()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DemandeCreateSerializer
        return DemandeSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            qs = Demande.objects.select_related('farmer', 'admin_responsable').all()
        elif user.role == 'TECHNICIEN':
            # Technicien voit les demandes en attente d'intervention
            qs = Demande.objects.filter(statut='VALIDEE')
        else:
            qs = Demande.objects.filter(farmer=user)

        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        return qs

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user)


class DemandeDetailView(generics.RetrieveUpdateDestroyAPIView):
    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsFarmer()]
        if self.request.method in ['PUT', 'PATCH']:
            return [IsFarmer()]
        return [IsAnyRole()]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return DemandeCreateSerializer
        return DemandeSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Demande.objects.all()
        elif user.role == 'FARMER':
            return Demande.objects.filter(farmer=user)
        return Demande.objects.filter(statut='VALIDEE')

    def update(self, request, *args, **kwargs):
        demande = self.get_object()
        if demande.statut != 'EN_ATTENTE':
            return Response(
                {'error': 'Impossible de modifier une demande déjà traitée.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        demande = self.get_object()
        if demande.statut != 'EN_ATTENTE':
            return Response(
                {'error': 'Impossible de supprimer une demande déjà traitée.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        demande.delete()
        return Response({'message': 'Demande annulée.'}, status=status.HTTP_204_NO_CONTENT)


class DemandeTraiterView(APIView):
    """
    POST /api/demandes/<id>/traiter/
    Admin valide ou refuse une demande Farmer.
    Body: { "action": "VALIDER" | "REFUSER", "motif_refus": "..." }
    """
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            demande = Demande.objects.get(pk=pk)
        except Demande.DoesNotExist:
            return Response({'error': 'Demande introuvable.'}, status=404)

        if demande.statut != 'EN_ATTENTE':
            return Response(
                {'error': 'Cette demande a déjà été traitée.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = DemandeTraitementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        action = serializer.validated_data['action']
        if action == 'VALIDER':
            demande.statut = 'VALIDEE'
        else:
            demande.statut = 'REFUSEE'
            demande.motif_refus = serializer.validated_data.get('motif_refus', '')

        demande.admin_responsable = request.user
        demande.date_traitement = timezone.now()
        demande.save()

        return Response({
            'message': f'Demande {demande.statut.lower()} avec succès.',
            'statut': demande.statut,
        })
