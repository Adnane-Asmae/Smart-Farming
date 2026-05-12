"""
App Demandes - Modèle (Farmer → Admin)
"""

from django.db import models
from django.conf import settings


class Demande(models.Model):
    TYPE_CHOICES = [
        ('AJOUT', 'Ajout'),
        ('MODIFICATION', 'Modification'),
        ('SUPPRESSION', 'Suppression'),
    ]

    OBJET_CHOICES = [
        ('PARCELLE', 'Parcelle'),
        ('CULTURE', 'Culture'),
        ('MACHINE', 'Machine'),
        ('INTERVENTION', 'Intervention'),
        ('AUTRE', 'Autre'),
    ]

    STATUT_CHOICES = [
        ('EN_ATTENTE', 'En attente'),
        ('VALIDEE', 'Validée'),
        ('REFUSEE', 'Refusée'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    objet = models.CharField(max_length=20, choices=OBJET_CHOICES)
    description = models.TextField(help_text="Description détaillée de la demande")
    date_envoi = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='EN_ATTENTE')
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='demandes',
        limit_choices_to={'role': 'FARMER'},
    )
    admin_responsable = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='demandes_traitees',
        limit_choices_to={'role': 'ADMIN'},
    )
    motif_refus = models.TextField(blank=True, null=True)
    date_traitement = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'demandes'
        verbose_name = 'Demande'
        verbose_name_plural = 'Demandes'
        ordering = ['-date_envoi']

    def __str__(self):
        return f"Demande {self.type} - {self.objet} ({self.statut})"
