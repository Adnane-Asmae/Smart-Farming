"""
App Parcelles - Modèle Parcelle
"""

from django.db import models
from django.conf import settings


class Parcelle(models.Model):
    nom = models.CharField(max_length=100)
    superficie = models.FloatField(help_text="Superficie en hectares")
    localisation = models.CharField(
        max_length=255,
        help_text="Coordonnées GPS ou description géographique"
    )
    type_sol = models.CharField(
        max_length=50,
        help_text="Type de sol : argileux, sableux, limoneux..."
    )
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='parcelles',
        limit_choices_to={'role': 'FARMER'},
    )
    date_creation = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'parcelles'
        verbose_name = 'Parcelle'
        verbose_name_plural = 'Parcelles'
        ordering = ['-date_creation']

    def __str__(self):
        return f"{self.nom} ({self.farmer.full_name})"
