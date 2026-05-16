"""
Smart Farming - Script de seeding (données de test) safe
Usage: python seed_safe.py
"""

import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from django.utils import timezone
from datetime import date, time, timedelta
from apps.users.models import Utilisateur
from apps.parcelles.models import Parcelle
from apps.cultures.models import Culture
from apps.machines.models import Machine
from apps.interventions.models import Intervention
from apps.demandes.models import Demande
from apps.irrigation.models import PlanIrrigation, CycleIrrigation, IoTSensor, IoTAlert

print("Debut du seeding Smart Farming...")

# Utilisateurs
admin, created = Utilisateur.objects.get_or_create(
    email='admin@smartfarming.ma',
    defaults={
        'nom': 'Benali',
        'prenom': 'Karim',
        'role': 'ADMIN',
        'password': 'Admin123!'
    }
)
if created:
    admin.set_password('Admin123!')
    admin.save()
    print(f"Admin cree : {admin}")

tech, created = Utilisateur.objects.get_or_create(
    email='tech@smartfarming.ma',
    defaults={
        'nom': 'El Idrissi',
        'prenom': 'Youssef',
        'role': 'TECHNICIEN',
        'password': 'Tech123!'
    }
)
if created:
    tech.set_password('Tech123!')
    tech.save()
    print(f"Technicien cree : {tech}")

farmer, created = Utilisateur.objects.get_or_create(
    email='farmer@smartfarming.ma',
    defaults={
        'nom': 'Ouazzani',
        'prenom': 'Hassan',
        'role': 'FARMER',
        'password': 'Farmer123!'
    }
)
if created:
    farmer.set_password('Farmer123!')
    farmer.save()
    print(f"Farmer cree : {farmer}")

# Parcelles
p1, created = Parcelle.objects.get_or_create(
    nom='Parcelle Nord - Ble',
    defaults={
        'superficie': 5.5,
        'localisation': '31.6295 N, 7.9811 W - Region Marrakech',
        'type_sol': 'Argileux',
        'farmer': farmer,
    }
)
p2, created = Parcelle.objects.get_or_create(
    nom='Serre Tomates Souss',
    defaults={
        'superficie': 1.2,
        'localisation': '30.4202 N, 9.5982 W - Souss-Massa',
        'type_sol': 'Sableux',
        'farmer': farmer,
    }
)
print(f"Parcelles OK: {p1}, {p2}")

# Cultures
c1, _ = Culture.objects.get_or_create(
    parcelle=p1,
    defaults={
        'nom': 'Ble dur',
        'type': 'CEREALE',
        'stade': 'CROISSANCE',
        'date_plantation': date(2026, 1, 15),
        'date_recolte_prevue': date(2026, 6, 20),
    }
)
c2, _ = Culture.objects.get_or_create(
    parcelle=p2,
    defaults={
        'nom': 'Tomate cerise',
        'type': 'LEGUME',
        'stade': 'FLORAISON',
        'date_plantation': date(2026, 2, 1),
        'date_recolte_prevue': date(2026, 5, 15),
    }
)

# Machines
m1, _ = Machine.objects.get_or_create(
    numero_serie='MF-5711-2023-001',
    defaults={
        'nom': 'Tracteur Massey Ferguson',
        'modele': 'MF 5711',
        'type': 'TRACTEUR',
        'farmer': farmer,
        'date_mise_service': date(2023, 3, 10),
        'statut': 'DISPONIBLE',
    }
)
m2, _ = Machine.objects.get_or_create(
    numero_serie='NF-GR200-2024-007',
    defaults={
        'nom': 'Systeme d\'irrigation goutte-a-goutte',
        'modele': 'Netafim GR-200',
        'type': 'IRRIGATEUR',
        'farmer': farmer,
        'date_mise_service': date(2024, 1, 5),
        'statut': 'EN_UTILISATION',
    }
)

# Interventions
i1, _ = Intervention.objects.get_or_create(
    parcelle=p1,
    machine=m1,
    defaults={
        'type': 'TRAITEMENT',
        'date_planifiee': timezone.now() + timedelta(days=3),
        'statut': 'A_FAIRE',
        'technicien': tech,
        'created_by': admin,
    }
)
i2, _ = Intervention.objects.get_or_create(
    parcelle=p2,
    machine=m2,
    defaults={
        'type': 'IRRIGATION',
        'date_planifiee': timezone.now() - timedelta(days=1),
        'date_effective': timezone.now() - timedelta(hours=2),
        'statut': 'TERMINE',
        'technicien': tech,
        'compte_rendu': 'Irrigation realisee. Humidite du sol a 65%. RAS.',
        'created_by': admin,
    }
)

# Demandes
d1, _ = Demande.objects.get_or_create(
    farmer=farmer,
    type='AJOUT',
    objet='MACHINE',
    defaults={
        'description': 'Demande d\'ajout d\'un drone agricole pour surveillance des cultures cereales.',
    }
)
d2, _ = Demande.objects.get_or_create(
    farmer=farmer,
    type='MODIFICATION',
    objet='PARCELLE',
    defaults={
        'description': 'Mise a jour de la superficie de la Serre Tomates (de 1.2 a 1.5 ha).',
        'statut': 'VALIDEE',
        'admin_responsable': admin,
        'date_traitement': timezone.now(),
    }
)

# Irrigation
plan, _ = PlanIrrigation.objects.get_or_create(
    parcelle=p1,
    defaults={
        'methode': 'GOUTTE_A_GOUTTE',
        'frequence_jours': 3,
        'duree_minutes': 45,
        'heure_debut': time(6, 0),
        'volume_m3': 12.5,
        'actif': True,
        'created_by': tech,
    }
)
cycle, _ = CycleIrrigation.objects.get_or_create(
    plan=plan,
    date_planifiee=timezone.now() + timedelta(days=1),
    defaults={
        'statut': 'PLANIFIE',
        'technicien': tech,
    }
)
print(f"Plan irrigation + cycle OK")

# IoT Sensors
s1, _ = IoTSensor.objects.get_or_create(
    sensor_name='Sensor A-1',
    parcelle=p1,
    defaults={
        'moisture_level': 45.2,
        'battery_level': 87.5,
        'status': 'ACTIVE'
    }
)
s2, _ = IoTSensor.objects.get_or_create(
    sensor_name='Sensor B-2',
    parcelle=p2,
    defaults={
        'moisture_level': 22.8,
        'battery_level': 65.3,
        'status': 'ACTIVE'
    }
)
print(f"IoT Sensors OK: {s1}, {s2}")

# IoT Alerts
alert, _ = IoTAlert.objects.get_or_create(
    sensor=s2,
    message=f"Critical water stress detected in {p2.nom}",
    defaults={
        'alert_type': 'CRITICAL'
    }
)
print(f"IoT Alerts OK: {alert}")

print("\nSeeding termine avec succes !")
print("=" * 50)
print("Comptes de test :")
print("  Admin      -> admin@smartfarming.ma    / Admin123!")
print("  Technicien -> tech@smartfarming.ma     / Tech123!")
print("  Farmer     -> farmer@smartfarming.ma   / Farmer123!")
print("=" * 50)
