"""
App Machines - Serializers
"""

from rest_framework import serializers
from .models import Machine


class MachineSerializer(serializers.ModelSerializer):
    farmer_nom = serializers.CharField(source='farmer.full_name', read_only=True)

    class Meta:
        model = Machine
        fields = [
            'id', 'nom', 'modele', 'numero_serie', 'type',
            'farmer', 'farmer_nom', 'date_mise_service', 'statut', 'description'
        ]
        read_only_fields = ['id', 'farmer_nom']
