from django.urls import path
from .views import DemandeListCreateView, DemandeDetailView, DemandeTraiterView

urlpatterns = [
    path('', DemandeListCreateView.as_view(), name='demande-list-create'),
    path('<int:pk>/', DemandeDetailView.as_view(), name='demande-detail'),
    path('<int:pk>/traiter/', DemandeTraiterView.as_view(), name='demande-traiter'),
]
