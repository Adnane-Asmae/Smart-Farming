"""
Smart Farming - URLs principales
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

# ─── Swagger / OpenAPI ───────────────────────────────────────────────────────
schema_view = get_schema_view(
    openapi.Info(
        title="Smart Farming API",
        default_version='v1',
        description="API de la plateforme Smart Farming - Gestion agricole intelligente",
        contact=openapi.Contact(email="admin@smartfarming.ma"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    # Admin Django
    path('admin/', admin.site.urls),

    # Auth JWT
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # Apps
    path('api/users/', include('apps.users.urls')),
    path('api/parcelles/', include('apps.parcelles.urls')),
    path('api/cultures/', include('apps.cultures.urls')),
    path('api/machines/', include('apps.machines.urls')),
    path('api/interventions/', include('apps.interventions.urls')),
    path('api/demandes/', include('apps.demandes.urls')),
    path('api/irrigation/', include('apps.irrigation.urls')),

    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
