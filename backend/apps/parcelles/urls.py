from django.urls import path
from .views import ParcelleListCreateView, ParcelleDetailView

urlpatterns = [
    path('', ParcelleListCreateView.as_view(), name='parcelle-list-create'),
    path('<int:pk>/', ParcelleDetailView.as_view(), name='parcelle-detail'),
]
