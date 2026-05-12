"""
App Cultures - Serializers
"""

from rest_framework import serializers
from .models import Culture


class CultureSerializer(serializers.ModelSerializer):
    parcelle_nom = serializers.CharField(source='parcelle.nom', read_only=True)
    farmer_nom = serializers.CharField(source='parcelle.farmer.full_name', read_only=True)

    class Meta:
        model = Culture
        fields = [
            'id', 'nom', 'type', 'stade', 'parcelle', 'parcelle_nom',
            'farmer_nom', 'date_plantation', 'date_recolte_prevue', 'observations'
        ]
        read_only_fields = ['id', 'parcelle_nom', 'farmer_nom']
