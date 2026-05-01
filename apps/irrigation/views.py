"""
App Irrigation - Views
"""

from rest_framework import generics, status
from rest_framework.response import Response
from smart_farming.permissions import IsAdmin, IsAdminOrTechnicien, IsAnyRole
from .models import PlanIrrigation, CycleIrrigation
from .serializers import PlanIrrigationSerializer, CycleIrrigationSerializer


# ─── Plans d'irrigation ──────────────────────────────────────────────────────

class PlanIrrigationListCreateView(generics.ListCreateAPIView):
    serializer_class = PlanIrrigationSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return PlanIrrigation.objects.select_related('parcelle', 'created_by').all()
        elif user.role == 'TECHNICIEN':
            return PlanIrrigation.objects.filter(
                parcelle__interventions__technicien=user
            ).distinct()
        return PlanIrrigation.objects.filter(parcelle__farmer=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PlanIrrigationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlanIrrigationSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdmin()]
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return PlanIrrigation.objects.all()
        elif user.role == 'TECHNICIEN':
            return PlanIrrigation.objects.filter(
                parcelle__interventions__technicien=user
            ).distinct()
        return PlanIrrigation.objects.filter(parcelle__farmer=user)


# ─── Cycles d'irrigation ─────────────────────────────────────────────────────

class CycleIrrigationListCreateView(generics.ListCreateAPIView):
    serializer_class = CycleIrrigationSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            qs = CycleIrrigation.objects.all()
        elif user.role == 'TECHNICIEN':
            qs = CycleIrrigation.objects.filter(
                plan__parcelle__interventions__technicien=user
            ).distinct()
        else:
            qs = CycleIrrigation.objects.filter(plan__parcelle__farmer=user)

        plan_id = self.request.query_params.get('plan')
        if plan_id:
            qs = qs.filter(plan_id=plan_id)
        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        return qs


class CycleIrrigationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CycleIrrigationSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdmin()]
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAdminOrTechnicien()]
        return [IsAnyRole()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return CycleIrrigation.objects.all()
        elif user.role == 'TECHNICIEN':
            return CycleIrrigation.objects.filter(
                plan__parcelle__interventions__technicien=user
            ).distinct()
        return CycleIrrigation.objects.filter(plan__parcelle__farmer=user)
