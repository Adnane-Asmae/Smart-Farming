"""
App Parcelles - Views
- Admin : CRUD complet sur toutes les parcelles
- Technicien : lecture des parcelles qui lui sont assignées (via interventions)
- Farmer : lecture de ses propres parcelles
"""

from rest_framework import generics, status
from rest_framework.response import Response
from smart_farming.permissions import IsAdmin, IsAdminOrTechnicien, IsAnyRole
from .models import Parcelle
from .serializers import ParcelleSerializer, ParcelleCreateSerializer


class ParcelleListCreateView(generics.ListCreateAPIView):
    """
    GET  → Liste des parcelles (filtrée par rôle)
    POST → Création (Admin seulement)
    """
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [IsAnyRole()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ParcelleCreateSerializer
        return ParcelleSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            qs = Parcelle.objects.all()
        elif user.role == 'TECHNICIEN':
            # Technicien voit les parcelles de ses interventions assignées
            qs = Parcelle.objects.filter(
                interventions__technicien=user
            ).distinct()
        else:
            # Farmer voit ses propres parcelles
            qs = Parcelle.objects.filter(farmer=user)

        # Filtres optionnels
        type_sol = self.request.query_params.get('type_sol')
        if type_sol:
            qs = qs.filter(type_sol__icontains=type_sol)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(nom__icontains=search)
        return qs


class ParcelleDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    → Détail d'une parcelle
    PUT    → Mise à jour (Admin)
    DELETE → Suppression (Admin)
    """
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdmin()]
        return [IsAnyRole()]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ParcelleCreateSerializer
        return ParcelleSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Parcelle.objects.all()
        elif user.role == 'TECHNICIEN':
            return Parcelle.objects.filter(interventions__technicien=user).distinct()
        return Parcelle.objects.filter(farmer=user)

    def destroy(self, request, *args, **kwargs):
        parcelle = self.get_object()
        parcelle.delete()
        return Response({'message': 'Parcelle supprimée.'}, status=status.HTTP_204_NO_CONTENT)
