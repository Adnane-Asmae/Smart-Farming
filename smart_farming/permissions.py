"""
Smart Farming - Permissions personnalisées par rôle
"""

from rest_framework.permissions import BasePermission

ROLE_ADMIN = 'ADMIN'
ROLE_TECHNICIEN = 'TECHNICIEN'
ROLE_FARMER = 'FARMER'


class IsAdmin(BasePermission):
    """Accès réservé aux administrateurs."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == ROLE_ADMIN
        )


class IsTechnicien(BasePermission):
    """Accès réservé aux techniciens/agronomes."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == ROLE_TECHNICIEN
        )


class IsFarmer(BasePermission):
    """Accès réservé aux agriculteurs."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == ROLE_FARMER
        )


class IsAdminOrTechnicien(BasePermission):
    """Admin ou Technicien."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [ROLE_ADMIN, ROLE_TECHNICIEN]
        )


class IsAdminOrFarmer(BasePermission):
    """Admin ou Farmer."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [ROLE_ADMIN, ROLE_FARMER]
        )


class IsAnyRole(BasePermission):
    """Tout utilisateur authentifié (tous rôles)."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
