"""
App Interventions - Serializers
"""

from rest_framework import serializers
from .models import Intervention


class InterventionSerializer(serializers.ModelSerializer):
    technicien_nom = serializers.CharField(source='technicien.full_name', read_only=True)
    parcelle_nom = serializers.CharField(source='parcelle.nom', read_only=True)
    machine_nom = serializers.CharField(source='machine.nom', read_only=True)
    created_by_nom = serializers.CharField(source='created_by.full_name', read_only=True)

    class Meta:
        model = Intervention
        fields = [
            'id', 'type', 'date_planifiee', 'date_effective', 'statut',
            'technicien', 'technicien_nom',
            'parcelle', 'parcelle_nom',
            'machine', 'machine_nom',
            'compte_rendu', 'date_creation',
            'created_by', 'created_by_nom',
        ]
        read_only_fields = ['id', 'date_creation', 'technicien_nom', 'parcelle_nom', 'machine_nom', 'created_by_nom']


class InterventionUpdateStatutSerializer(serializers.ModelSerializer):
    """Utilisé par le Technicien pour mettre à jour statut + compte_rendu."""
    class Meta:
        model = Intervention
        fields = ['statut', 'date_effective', 'compte_rendu']
