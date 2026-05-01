from django.urls import path
from .views import (
    UtilisateurListCreateView,
    UtilisateurDetailView,
    UtilisateurToggleStatutView,
    MeView,
    ChangePasswordView,
    CustomTokenObtainPairView,
)

urlpatterns = [
    path('', UtilisateurListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UtilisateurDetailView.as_view(), name='user-detail'),
    path('<int:pk>/toggle-statut/', UtilisateurToggleStatutView.as_view(), name='user-toggle-statut'),
    path('me/', MeView.as_view(), name='user-me'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
