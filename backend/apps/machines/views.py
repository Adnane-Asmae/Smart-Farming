"""
App Machines - Views
- Admin : CRUD complet
- Technicien : lecture + mise à jour statut (panne, maintenance)
- Farmer : lecture de ses machines
"""

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from smart_farming.permissions import IsAdmin, IsAdminOrTechnicien, IsAnyRole
from .models import Machine
from .serializers import MachineSerializer


class MachineListCreateView(generics.ListCreateAPIView):
    serializer_class = MachineSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            qs = Machine.objects.all()
        elif user.role == 'TECHNICIEN':
            qs = Machine.objects.filter(
                interventions__technicien=user
            ).distinct()
        else:
            qs = Machine.objects.filter(farmer=user)

        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        type_m = self.request.query_params.get('type')
        if type_m:
            qs = qs.filter(type=type_m)
        return qs


class MachineDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MachineSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdmin()]
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Machine.objects.all()
        elif user.role == 'TECHNICIEN':
            return Machine.objects.filter(interventions__technicien=user).distinct()
        return Machine.objects.filter(farmer=user)

    def destroy(self, request, *args, **kwargs):
        machine = self.get_object()
        machine.delete()
        return Response({'message': 'Machine supprimée.'}, status=status.HTTP_204_NO_CONTENT)


class MachineSignalerPanneView(APIView):
    """
    POST /api/machines/<id>/signaler-panne/
    Technicien ou Admin peuvent signaler une panne.
    """
    permission_classes = [IsAdminOrTechnicien]

    def post(self, request, pk):
        try:
            machine = Machine.objects.get(pk=pk)
        except Machine.DoesNotExist:
            return Response({'error': 'Machine introuvable.'}, status=404)
        machine.statut = 'EN_PANNE'
        machine.save()
        return Response({'message': f'Panne signalée pour {machine.nom}.', 'statut': machine.statut})
