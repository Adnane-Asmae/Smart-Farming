from django.urls import path
from .views import InterventionListCreateView, InterventionDetailView

urlpatterns = [
    path('', InterventionListCreateView.as_view(), name='intervention-list-create'),
    path('<int:pk>/', InterventionDetailView.as_view(), name='intervention-detail'),
]
from .views import (
    InterventionListCreateView,
    InterventionDetailView,
    RapportTechnicienPDFView,  # ← ajoute ça
)

urlpatterns = [
    path('', InterventionListCreateView.as_view(), name='intervention-list-create'),
    path('<int:pk>/', InterventionDetailView.as_view(), name='intervention-detail'),
    path('rapport/<int:technicien_id>/', RapportTechnicienPDFView.as_view(), name='rapport-technicien'),  # ← ajoute ça
]