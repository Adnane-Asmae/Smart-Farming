from django.urls import path
from .views import CultureListCreateView, CultureDetailView

urlpatterns = [
    path('', CultureListCreateView.as_view(), name='culture-list-create'),
    path('<int:pk>/', CultureDetailView.as_view(), name='culture-detail'),
]
