"""
App Irrigation - Serializers
"""

from rest_framework import serializers
from .models import PlanIrrigation, CycleIrrigation, IoTSensor, IoTAlert


class PlanIrrigationSerializer(serializers.ModelSerializer):
    parcelle_nom = serializers.CharField(source='parcelle.nom', read_only=True)
    created_by_nom = serializers.CharField(source='created_by.full_name', read_only=True)

    class Meta:
        model = PlanIrrigation
        fields = [
            'id', 'parcelle', 'parcelle_nom', 'methode', 'frequence_jours',
            'duree_minutes', 'heure_debut', 'volume_m3', 'actif',
            'created_by', 'created_by_nom', 'date_creation', 'date_modification', 'notes'
        ]
        read_only_fields = ['id', 'parcelle_nom', 'created_by_nom', 'date_creation', 'date_modification']


class CycleIrrigationSerializer(serializers.ModelSerializer):
    plan_parcelle = serializers.CharField(source='plan.parcelle.nom', read_only=True)
    technicien_nom = serializers.CharField(source='technicien.full_name', read_only=True)

    class Meta:
        model = CycleIrrigation
        fields = [
            'id', 'plan', 'plan_parcelle', 'date_planifiee',
            'date_debut_effective', 'date_fin_effective',
            'volume_consomme_m3', 'statut', 'observations',
            'technicien', 'technicien_nom',
        ]
        read_only_fields = ['id', 'plan_parcelle', 'technicien_nom']


class IoTSensorSerializer(serializers.ModelSerializer):
    parcelle_nom = serializers.CharField(source='parcelle.nom', read_only=True)

    class Meta:
        model = IoTSensor
        fields = [
            'id', 'sensor_name', 'parcelle', 'parcelle_nom',
            'moisture_level', 'battery_level', 'status', 'last_update'
        ]
        read_only_fields = ['id', 'last_update']


class IoTAlertSerializer(serializers.ModelSerializer):
    sensor_name = serializers.CharField(source='sensor.sensor_name', read_only=True)
    parcelle_nom = serializers.CharField(source='sensor.parcelle.nom', read_only=True)

    class Meta:
        model = IoTAlert
        fields = [
            'id', 'sensor', 'sensor_name', 'parcelle_nom',
            'message', 'alert_type', 'created_at', 'resolved'
        ]
        read_only_fields = ['id', 'created_at']
