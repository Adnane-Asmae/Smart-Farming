"""
App Machines - Modèle Machine agricole
"""

from django.db import models
from django.conf import settings


class Machine(models.Model):
    TYPE_CHOICES = [
        ('TRACTEUR', 'Tracteur'),
        ('MOISSONNEUSE', 'Moissonneuse-batteuse'),
        ('DRONE', 'Drone agricole'),
        ('IRRIGATEUR', 'Irrigateur'),
        ('AUTRE', 'Autre'),
    ]

    STATUT_CHOICES = [
        ('DISPONIBLE', 'Disponible'),
        ('EN_UTILISATION', 'En utilisation'),
        ('EN_PANNE', 'En panne'),
        ('EN_MAINTENANCE', 'En maintenance'),
        ('HORS_SERVICE', 'Hors service'),
    ]

    nom = models.CharField(max_length=100)
    modele = models.CharField(max_length=100)
    numero_serie = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='AUTRE')
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='machines',
        limit_choices_to={'role': 'FARMER'},
    )
    date_mise_service = models.DateField()
    statut = models.CharField(max_length=50, choices=STATUT_CHOICES, default='DISPONIBLE')
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'machines'
        verbose_name = 'Machine'
        verbose_name_plural = 'Machines'
        ordering = ['nom']

    def __str__(self):
        return f"{self.nom} - {self.modele} ({self.statut})"
