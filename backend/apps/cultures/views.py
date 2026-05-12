"""
App Cultures - Views
- Admin : CRUD complet
- Technicien : lecture + mise à jour observations
- Farmer : lecture de ses cultures uniquement
"""

from rest_framework import generics, status
from rest_framework.response import Response
from smart_farming.permissions import IsAdmin, IsAdminOrTechnicien, IsAnyRole
from .models import Culture
from .serializers import CultureSerializer


class CultureListCreateView(generics.ListCreateAPIView):
    serializer_class = CultureSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            qs = Culture.objects.select_related('parcelle', 'parcelle__farmer').all()
        elif user.role == 'TECHNICIEN':
            qs = Culture.objects.filter(
                parcelle__interventions__technicien=user
            ).distinct()
        else:
            qs = Culture.objects.filter(parcelle__farmer=user)

        # Filtres
        parcelle_id = self.request.query_params.get('parcelle')
        if parcelle_id:
            qs = qs.filter(parcelle_id=parcelle_id)
        stade = self.request.query_params.get('stade')
        if stade:
            qs = qs.filter(stade=stade)
        return qs


class CultureDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CultureSerializer

    def get_permissions(self):
        if self.request.method in ['DELETE']:
            return [IsAdmin()]
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Culture.objects.all()
        elif user.role == 'TECHNICIEN':
            return Culture.objects.filter(
                parcelle__interventions__technicien=user
            ).distinct()
        return Culture.objects.filter(parcelle__farmer=user)

    def destroy(self, request, *args, **kwargs):
        culture = self.get_object()
        culture.delete()
        return Response({'message': 'Culture supprimée.'}, status=status.HTTP_204_NO_CONTENT)
