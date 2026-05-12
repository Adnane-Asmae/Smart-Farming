"""
App Interventions - Modèle Intervention
"""

from django.db import models
from django.conf import settings
from apps.parcelles.models import Parcelle
from apps.machines.models import Machine


class Intervention(models.Model):
    TYPE_CHOICES = [
        ('IRRIGATION', 'Irrigation'),
        ('TRAITEMENT', 'Traitement phytosanitaire'),
        ('FERTILISATION', 'Fertilisation'),
        ('MECANISATION', 'Mécanisation'),
        ('RECOLTE', 'Récolte'),
        ('MAINTENANCE', 'Maintenance machine'),
        ('OBSERVATION', 'Observation / diagnostic'),
        ('AUTRE', 'Autre'),
    ]

    STATUT_CHOICES = [
        ('A_FAIRE', 'À faire'),
        ('EN_COURS', 'En cours'),
        ('TERMINE', 'Terminé'),
        ('ANNULE', 'Annulé'),
    ]

    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='AUTRE')
    date_planifiee = models.DateTimeField()
    date_effective = models.DateTimeField(null=True, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='A_FAIRE')
    technicien = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='interventions',
        limit_choices_to={'role': 'TECHNICIEN'},
    )
    parcelle = models.ForeignKey(
        Parcelle,
        on_delete=models.CASCADE,
        related_name='interventions',
    )
    machine = models.ForeignKey(
        Machine,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='interventions',
    )
    compte_rendu = models.TextField(blank=True, null=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='interventions_creees',
    )

    class Meta:
        db_table = 'interventions'
        verbose_name = 'Intervention'
        verbose_name_plural = 'Interventions'
        ordering = ['-date_planifiee']

    def __str__(self):
        return f"{self.type} - {self.parcelle.nom} ({self.statut})"
