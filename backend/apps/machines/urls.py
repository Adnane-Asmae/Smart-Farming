from django.urls import path
from .views import MachineListCreateView, MachineDetailView, MachineSignalerPanneView

urlpatterns = [
    path('', MachineListCreateView.as_view(), name='machine-list-create'),
    path('<int:pk>/', MachineDetailView.as_view(), name='machine-detail'),
    path('<int:pk>/signaler-panne/', MachineSignalerPanneView.as_view(), name='machine-panne'),
]
