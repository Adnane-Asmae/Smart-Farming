"""
App Users - Views (CRUD complet, Admin uniquement sauf profil perso)
"""

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from smart_farming.permissions import IsAdmin
from .models import Utilisateur
from .serializers import (
    UtilisateurSerializer,
    UtilisateurCreateSerializer,
    UtilisateurUpdateSerializer,
    ChangePasswordSerializer,
    CustomTokenObtainPairSerializer,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    """Login JWT avec infos utilisateur dans la réponse."""
    serializer_class = CustomTokenObtainPairSerializer


class MeView(APIView):
    """Profil de l'utilisateur connecté."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UtilisateurSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UtilisateurUpdateSerializer(
            request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ChangePasswordView(APIView):
    """Changement de mot de passe (utilisateur lui-même)."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'error': 'Ancien mot de passe incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'message': 'Mot de passe modifié avec succès.'})


# ─── CRUD Utilisateurs (Admin seulement) ──────────────────────────────────────

class UtilisateurListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/users/          → Liste tous les utilisateurs (Admin)
    POST /api/users/          → Crée un utilisateur (Admin)
    """
    permission_classes = [IsAdmin]
    queryset = Utilisateur.objects.all().order_by('-date_creation')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UtilisateurCreateSerializer
        return UtilisateurSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        role = self.request.query_params.get('role')
        if role:
            qs = qs.filter(role=role)
        statut = self.request.query_params.get('statut')
        if statut is not None:
            qs = qs.filter(statut=statut.lower() == 'true')
        return qs


class UtilisateurDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/users/<id>/   → Détail utilisateur (Admin)
    PUT    /api/users/<id>/   → Mise à jour (Admin)
    DELETE /api/users/<id>/   → Suppression (Admin)
    """
    permission_classes = [IsAdmin]
    queryset = Utilisateur.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UtilisateurUpdateSerializer
        return UtilisateurSerializer

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if user == request.user:
            return Response(
                {'error': 'Vous ne pouvez pas supprimer votre propre compte.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.delete()
        return Response({'message': 'Utilisateur supprimé.'}, status=status.HTTP_204_NO_CONTENT)


class UtilisateurToggleStatutView(APIView):
    """
    POST /api/users/<id>/toggle-statut/  → Activer/Désactiver un compte (Admin)
    """
    permission_classes = [IsAdmin]

    def post(self, request, pk):
        try:
            user = Utilisateur.objects.get(pk=pk)
        except Utilisateur.DoesNotExist:
            return Response({'error': 'Utilisateur introuvable.'}, status=404)
        user.statut = not user.statut
        user.is_active = user.statut
        user.save()
        state = 'activé' if user.statut else 'désactivé'
        return Response({'message': f'Compte {state} avec succès.', 'statut': user.statut})
