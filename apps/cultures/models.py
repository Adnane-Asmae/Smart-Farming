"""
App Cultures - Modèle, Serializers, Views, URLs
"""

# ─── models.py ───────────────────────────────────────────────────────────────
from django.db import models
from apps.parcelles.models import Parcelle


class Culture(models.Model):
    STADE_CHOICES = [
        ('SEMIS', 'Semis'),
        ('GERMINATION', 'Germination'),
        ('CROISSANCE', 'Croissance'),
        ('FLORAISON', 'Floraison'),
        ('FRUCTIFICATION', 'Fructification'),
        ('RECOLTE', 'Récolte'),
        ('JACHÈRE', 'Jachère'),
    ]

    TYPE_CHOICES = [
        ('CEREALE', 'Céréale'),
        ('LEGUME', 'Légume'),
        ('ARBRE', 'Arbre fruitier'),
        ('FOURRAGE', 'Fourrage'),
        ('AUTRE', 'Autre'),
    ]

    nom = models.CharField(max_length=100, help_text="Ex: blé, tomate, olivier")
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='AUTRE')
    stade = models.CharField(max_length=50, choices=STADE_CHOICES, default='SEMIS')
    parcelle = models.ForeignKey(
        Parcelle,
        on_delete=models.CASCADE,
        related_name='cultures'
    )
    date_plantation = models.DateField()
    date_recolte_prevue = models.DateField(null=True, blank=True)
    observations = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'cultures'
        verbose_name = 'Culture'
        verbose_name_plural = 'Cultures'
        ordering = ['-date_plantation']

    def __str__(self):
        return f"{self.nom} - {self.parcelle.nom} ({self.stade})"
