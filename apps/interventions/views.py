"""
App Interventions - Views
- Admin : CRUD complet sur toutes les interventions
- Technicien : lecture des siennes + mise à jour statut/compte_rendu
- Farmer : lecture des interventions sur ses parcelles
"""

from rest_framework import generics, status
from rest_framework.response import Response
from smart_farming.permissions import IsAdmin, IsAdminOrTechnicien, IsAnyRole
from .models import Intervention
from .serializers import InterventionSerializer, InterventionUpdateStatutSerializer


class InterventionListCreateView(generics.ListCreateAPIView):
    serializer_class = InterventionSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            qs = Intervention.objects.select_related(
                'technicien', 'parcelle', 'machine', 'created_by'
            ).all()
        elif user.role == 'TECHNICIEN':
            qs = Intervention.objects.filter(technicien=user)
        else:
            qs = Intervention.objects.filter(parcelle__farmer=user)

        # Filtres
        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        type_i = self.request.query_params.get('type')
        if type_i:
            qs = qs.filter(type=type_i)
        parcelle_id = self.request.query_params.get('parcelle')
        if parcelle_id:
            qs = qs.filter(parcelle_id=parcelle_id)
        technicien_id = self.request.query_params.get('technicien')
        if technicien_id and user.role == 'ADMIN':
            qs = qs.filter(technicien_id=technicien_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class InterventionDetailView(generics.RetrieveUpdateDestroyAPIView):
    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdmin()]
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_serializer_class(self):
        user = self.request.user
        if self.request.method in ['PUT', 'PATCH'] and user.role == 'TECHNICIEN':
            return InterventionUpdateStatutSerializer
        return InterventionSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Intervention.objects.all()
        elif user.role == 'TECHNICIEN':
            return Intervention.objects.filter(technicien=user)
        return Intervention.objects.filter(parcelle__farmer=user)

    def destroy(self, request, *args, **kwargs):
        intervention = self.get_object()
        intervention.delete()
        return Response({'message': 'Intervention supprimée.'}, status=status.HTTP_204_NO_CONTENT)
