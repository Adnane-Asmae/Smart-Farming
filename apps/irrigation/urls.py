from django.urls import path
from .views import (
    PlanIrrigationListCreateView,
    PlanIrrigationDetailView,
    CycleIrrigationListCreateView,
    CycleIrrigationDetailView,
)

urlpatterns = [
    path('plans/', PlanIrrigationListCreateView.as_view(), name='plan-irrigation-list-create'),
    path('plans/<int:pk>/', PlanIrrigationDetailView.as_view(), name='plan-irrigation-detail'),
    path('cycles/', CycleIrrigationListCreateView.as_view(), name='cycle-irrigation-list-create'),
    path('cycles/<int:pk>/', CycleIrrigationDetailView.as_view(), name='cycle-irrigation-detail'),
]
