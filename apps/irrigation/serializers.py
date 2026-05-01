"""
App Irrigation - Serializers
"""

from rest_framework import serializers
from .models import PlanIrrigation, CycleIrrigation


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
