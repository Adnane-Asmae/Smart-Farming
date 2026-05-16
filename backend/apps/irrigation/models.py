"""
App Irrigation - Modèle PlanIrrigation + CycleIrrigation + IoTSensor + IoTAlert
"""

from django.db import models
from django.conf import settings
from apps.parcelles.models import Parcelle
from django.utils import timezone


class PlanIrrigation(models.Model):
    METHODE_CHOICES = [
        ('GOUTTE_A_GOUTTE', 'Goutte à goutte'),
        ('ASPERSION', 'Aspersion'),
        ('SUBMERSION', 'Submersion'),
        ('AUTRE', 'Autre'),
    ]

    parcelle = models.OneToOneField(
        Parcelle,
        on_delete=models.CASCADE,
        related_name='plan_irrigation'
    )
    methode = models.CharField(max_length=50, choices=METHODE_CHOICES, default='GOUTTE_A_GOUTTE')
    frequence_jours = models.IntegerField(help_text="Fréquence d'irrigation en jours")
    duree_minutes = models.IntegerField(help_text="Durée d'irrigation en minutes")
    heure_debut = models.TimeField(help_text="Heure de début d'irrigation")
    volume_m3 = models.FloatField(help_text="Volume d'eau en m³ par cycle")
    actif = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='plans_irrigation'
    )
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'plans_irrigation'
        verbose_name = 'Plan d\'irrigation'
        verbose_name_plural = 'Plans d\'irrigation'

    def __str__(self):
        return f"Plan irrigation - {self.parcelle.nom}"


class CycleIrrigation(models.Model):
    STATUT_CHOICES = [
        ('PLANIFIE', 'Planifié'),
        ('EN_COURS', 'En cours'),
        ('TERMINE', 'Terminé'),
        ('ANNULE', 'Annulé'),
        ('PROBLEME', 'Problème signalé'),
    ]

    plan = models.ForeignKey(
        PlanIrrigation,
        on_delete=models.CASCADE,
        related_name='cycles'
    )
    date_planifiee = models.DateTimeField()
    date_debut_effective = models.DateTimeField(null=True, blank=True)
    date_fin_effective = models.DateTimeField(null=True, blank=True)
    volume_consomme_m3 = models.FloatField(null=True, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='PLANIFIE')
    observations = models.TextField(blank=True, null=True)
    technicien = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cycles_irrigation',
        limit_choices_to={'role': 'TECHNICIEN'},
    )

    class Meta:
        db_table = 'cycles_irrigation'
        verbose_name = 'Cycle d\'irrigation'
        verbose_name_plural = 'Cycles d\'irrigation'
        ordering = ['-date_planifiee']

    def __str__(self):
        return f"Cycle {self.plan.parcelle.nom} - {self.date_planifiee}"


class IoTSensor(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
    ]

    sensor_name = models.CharField(max_length=100)
    parcelle = models.ForeignKey(
        Parcelle,
        on_delete=models.CASCADE,
        related_name='iot_sensors'
    )
    moisture_level = models.FloatField(help_text="Soil moisture level (%)")
    battery_level = models.FloatField(help_text="Sensor battery level (%)")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='ACTIVE'
    )
    last_update = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'iot_sensors'
        verbose_name = 'IoT Sensor'
        verbose_name_plural = 'IoT Sensors'

    def __str__(self):
        return f"{self.sensor_name} - {self.parcelle.nom}"


class IoTAlert(models.Model):
    ALERT_TYPE_CHOICES = [
        ('CRITICAL', 'Critical'),
        ('WARNING', 'Warning'),
    ]

    sensor = models.ForeignKey(
        IoTSensor,
        on_delete=models.CASCADE,
        related_name='alerts'
    )
    message = models.TextField()
    alert_type = models.CharField(
        max_length=20,
        choices=ALERT_TYPE_CHOICES,
        default='CRITICAL'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    class Meta:
        db_table = 'iot_alerts'
        verbose_name = 'IoT Alert'
        verbose_name_plural = 'IoT Alerts'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.alert_type} - {self.sensor.sensor_name}"
