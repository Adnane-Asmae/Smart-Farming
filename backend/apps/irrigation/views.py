"""
App Irrigation - Views
"""

import random
from rest_framework import generics, status, views
from rest_framework.response import Response
from smart_farming.permissions import IsAdmin, IsAdminOrTechnicien, IsAnyRole
from .models import PlanIrrigation, CycleIrrigation, IoTSensor, IoTAlert
from .serializers import (
    PlanIrrigationSerializer, 
    CycleIrrigationSerializer,
    IoTSensorSerializer,
    IoTAlertSerializer
)


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


# ─── IoT Sensors ──────────────────────────────────────────────────────

class IoTSensorListView(generics.ListAPIView):
    serializer_class = IoTSensorSerializer
    permission_classes = [IsAnyRole]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return IoTSensor.objects.select_related('parcelle').all()
        elif user.role == 'TECHNICIEN':
            return IoTSensor.objects.filter(
                parcelle__interventions__technicien=user
            ).distinct()
        return IoTSensor.objects.filter(parcelle__farmer=user)


class SimulateSensorUpdateView(views.APIView):
    permission_classes = [IsAdminOrTechnicien]

    def post(self, request):
        sensors = IoTSensor.objects.filter(status='ACTIVE')
        
        for sensor in sensors:
            sensor.moisture_level = round(random.uniform(10, 90), 1)
            sensor.battery_level = max(10, round(random.uniform(50, 100), 1))
            sensor.save()
            
            if sensor.moisture_level < 25:
                IoTAlert.objects.create(
                    sensor=sensor,
                    message=f"Critical water stress detected in {sensor.parcelle.nom}",
                    alert_type='CRITICAL'
                )
        
        return Response({
            "message": "Sensor data updated successfully!",
            "sensors_updated": sensors.count()
        })


class IoTDashboardDataView(views.APIView):
    permission_classes = [IsAnyRole]

    def get(self, request):
        user = request.user
        if user.role == 'ADMIN':
            sensors = IoTSensor.objects.filter(status='ACTIVE')
        elif user.role == 'TECHNICIEN':
            sensors = IoTSensor.objects.filter(
                parcelle__interventions__technicien=user,
                status='ACTIVE'
            ).distinct()
        else:
            sensors = IoTSensor.objects.filter(
                parcelle__farmer=user,
                status='ACTIVE'
            )
        
        active_sensors = sensors.count()
        
        if active_sensors > 0:
            avg_moisture = round(
                sum(s.moisture_level for s in sensors) / active_sensors,
                1
            )
        else:
            avg_moisture = 0
            
        parcels_needing_irrigation = sensors.filter(
            moisture_level__lt=30
        ).count()
        
        unresolved_alerts = IoTAlert.objects.filter(
            resolved=False,
            sensor__in=sensors
        ).count()
        
        return Response({
            "avg_moisture": avg_moisture,
            "parcels_needing_irrigation": parcels_needing_irrigation,
            "active_sensors": active_sensors,
            "unresolved_alerts": unresolved_alerts
        })


class IoTAlertListView(generics.ListAPIView):
    serializer_class = IoTAlertSerializer
    permission_classes = [IsAnyRole]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return IoTAlert.objects.select_related('sensor__parcelle').all()
        elif user.role == 'TECHNICIEN':
            return IoTAlert.objects.filter(
                sensor__parcelle__interventions__technicien=user
            ).distinct()
        return IoTAlert.objects.filter(sensor__parcelle__farmer=user)
