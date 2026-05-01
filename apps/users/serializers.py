"""
App Users - Serializers
"""

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Utilisateur


class UtilisateurSerializer(serializers.ModelSerializer):
    """Sérialisation complète (lecture)."""
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Utilisateur
        fields = [
            'id', 'nom', 'prenom', 'email', 'role',
            'statut', 'date_creation', 'full_name'
        ]
        read_only_fields = ['id', 'date_creation', 'full_name']


class UtilisateurCreateSerializer(serializers.ModelSerializer):
    """Création d'un utilisateur (avec mot de passe)."""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = Utilisateur
        fields = ['nom', 'prenom', 'email', 'role', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = Utilisateur(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UtilisateurUpdateSerializer(serializers.ModelSerializer):
    """Mise à jour d'un utilisateur (sans mot de passe)."""
    class Meta:
        model = Utilisateur
        fields = ['nom', 'prenom', 'email', 'role', 'statut']


class ChangePasswordSerializer(serializers.Serializer):
    """Changement de mot de passe."""
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)
    new_password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['new_password_confirm']:
            raise serializers.ValidationError("Les nouveaux mots de passe ne correspondent pas.")
        return data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT enrichi avec les infos user."""
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'nom': self.user.nom,
            'prenom': self.user.prenom,
            'role': self.user.role,
        }
        return data
