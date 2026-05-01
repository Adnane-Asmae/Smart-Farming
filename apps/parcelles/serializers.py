"""
App Parcelles - Serializers
"""

from rest_framework import serializers
from .models import Parcelle
from apps.users.serializers import UtilisateurSerializer


class ParcelleSerializer(serializers.ModelSerializer):
    farmer_nom = serializers.CharField(source='farmer.full_name', read_only=True)

    class Meta:
        model = Parcelle
        fields = [
            'id', 'nom', 'superficie', 'localisation', 'type_sol',
            'farmer', 'farmer_nom', 'date_creation', 'description'
        ]
        read_only_fields = ['id', 'date_creation', 'farmer_nom']


class ParcelleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcelle
        fields = ['nom', 'superficie', 'localisation', 'type_sol', 'farmer', 'description']
