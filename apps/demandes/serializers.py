"""
App Demandes - Serializers
"""

from rest_framework import serializers
from .models import Demande


class DemandeSerializer(serializers.ModelSerializer):
    farmer_nom = serializers.CharField(source='farmer.full_name', read_only=True)
    admin_nom = serializers.CharField(source='admin_responsable.full_name', read_only=True)

    class Meta:
        model = Demande
        fields = [
            'id', 'type', 'objet', 'description', 'date_envoi', 'statut',
            'farmer', 'farmer_nom',
            'admin_responsable', 'admin_nom',
            'motif_refus', 'date_traitement',
        ]
        read_only_fields = [
            'id', 'date_envoi', 'farmer_nom', 'admin_nom',
            'statut', 'motif_refus', 'date_traitement', 'admin_responsable'
        ]


class DemandeCreateSerializer(serializers.ModelSerializer):
    """Farmer crée une demande."""
    class Meta:
        model = Demande
        fields = ['type', 'objet', 'description']


class DemandeTraitementSerializer(serializers.Serializer):
    """Admin valide ou refuse une demande."""
    action = serializers.ChoiceField(choices=['VALIDER', 'REFUSER'])
    motif_refus = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        if data['action'] == 'REFUSER' and not data.get('motif_refus'):
            raise serializers.ValidationError("Un motif de refus est requis.")
        return data
