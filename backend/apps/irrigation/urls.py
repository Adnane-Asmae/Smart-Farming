from django.urls import path
from .views import (
    PlanIrrigationListCreateView,
    PlanIrrigationDetailView,
    CycleIrrigationListCreateView,
    CycleIrrigationDetailView,
    IoTSensorListView,
    SimulateSensorUpdateView,
    IoTDashboardDataView,
    IoTAlertListView,
)

urlpatterns = [
    path('plans/', PlanIrrigationListCreateView.as_view(), name='plan-irrigation-list-create'),
    path('plans/<int:pk>/', PlanIrrigationDetailView.as_view(), name='plan-irrigation-detail'),
    path('cycles/', CycleIrrigationListCreateView.as_view(), name='cycle-irrigation-list-create'),
    path('cycles/<int:pk>/', CycleIrrigationDetailView.as_view(), name='cycle-irrigation-detail'),
    
    # IoT endpoints
    path('sensors/', IoTSensorListView.as_view(), name='iot-sensor-list'),
    path('sensors/simulate/', SimulateSensorUpdateView.as_view(), name='iot-simulate-update'),
    path('sensors/dashboard/', IoTDashboardDataView.as_view(), name='iot-dashboard-data'),
    path('alerts/', IoTAlertListView.as_view(), name='iot-alert-list'),
]
