"""
Smart Farming - Script de seeding (données de test)
Usage: python manage.py shell < seed.py
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

print("🌱 Début du seeding Smart Farming...")

# ─── Utilisateurs ─────────────────────────────────────────────────────────────
admin = Utilisateur.objects.create_superuser(
    email='admin@smartfarming.ma',
    password='Admin123!',
    nom='Benali',
    prenom='Karim',
    role='ADMIN'
)
print(f"✅ Admin créé : {admin}")

tech = Utilisateur.objects.create_user(
    email='tech@smartfarming.ma',
    password='Tech123!',
    nom='El Idrissi',
    prenom='Youssef',
    role='TECHNICIEN'
)
print(f"✅ Technicien créé : {tech}")

farmer = Utilisateur.objects.create_user(
    email='farmer@smartfarming.ma',
    password='Farmer123!',
    nom='Ouazzani',
    prenom='Hassan',
    role='FARMER'
)
print(f"✅ Farmer créé : {farmer}")

# ─── Parcelles ────────────────────────────────────────────────────────────────
p1 = Parcelle.objects.create(
    nom='Parcelle Nord - Blé',
    superficie=5.5,
    localisation='31.6295° N, 7.9811° W - Région Marrakech',
    type_sol='Argileux',
    farmer=farmer,
)
p2 = Parcelle.objects.create(
    nom='Serre Tomates Souss',
    superficie=1.2,
    localisation='30.4202° N, 9.5982° W - Souss-Massa',
    type_sol='Sableux',
    farmer=farmer,
)
print(f"✅ Parcelles créées : {p1}, {p2}")

# ─── Cultures ─────────────────────────────────────────────────────────────────
c1 = Culture.objects.create(
    nom='Blé dur',
    type='CEREALE',
    stade='CROISSANCE',
    parcelle=p1,
    date_plantation=date(2026, 1, 15),
    date_recolte_prevue=date(2026, 6, 20),
)
c2 = Culture.objects.create(
    nom='Tomate cerise',
    type='LEGUME',
    stade='FLORAISON',
    parcelle=p2,
    date_plantation=date(2026, 2, 1),
    date_recolte_prevue=date(2026, 5, 15),
)
print(f"✅ Cultures créées : {c1}, {c2}")

# ─── Machines ─────────────────────────────────────────────────────────────────
m1 = Machine.objects.create(
    nom='Tracteur Massey Ferguson',
    modele='MF 5711',
    numero_serie='MF-5711-2023-001',
    type='TRACTEUR',
    farmer=farmer,
    date_mise_service=date(2023, 3, 10),
    statut='DISPONIBLE',
)
m2 = Machine.objects.create(
    nom='Système d\'irrigation goutte-à-goutte',
    modele='Netafim GR-200',
    numero_serie='NF-GR200-2024-007',
    type='IRRIGATEUR',
    farmer=farmer,
    date_mise_service=date(2024, 1, 5),
    statut='EN_UTILISATION',
)
print(f"✅ Machines créées : {m1}, {m2}")

# ─── Interventions ────────────────────────────────────────────────────────────
i1 = Intervention.objects.create(
    type='TRAITEMENT',
    date_planifiee=timezone.now() + timedelta(days=3),
    statut='A_FAIRE',
    technicien=tech,
    parcelle=p1,
    machine=m1,
    created_by=admin,
)
i2 = Intervention.objects.create(
    type='IRRIGATION',
    date_planifiee=timezone.now() - timedelta(days=1),
    date_effective=timezone.now() - timedelta(hours=2),
    statut='TERMINE',
    technicien=tech,
    parcelle=p2,
    machine=m2,
    compte_rendu='Irrigation réalisée. Humidité du sol à 65%. RAS.',
    created_by=admin,
)
print(f"✅ Interventions créées : {i1}, {i2}")

# ─── Demandes ─────────────────────────────────────────────────────────────────
d1 = Demande.objects.create(
    type='AJOUT',
    objet='MACHINE',
    description='Demande d\'ajout d\'un drone agricole pour surveillance des cultures céréalières.',
    farmer=farmer,
)
d2 = Demande.objects.create(
    type='MODIFICATION',
    objet='PARCELLE',
    description='Mise à jour de la superficie de la Serre Tomates (de 1.2 à 1.5 ha).',
    farmer=farmer,
    statut='VALIDEE',
    admin_responsable=admin,
    date_traitement=timezone.now(),
)
print(f"✅ Demandes créées : {d1}, {d2}")

# ─── Irrigation ───────────────────────────────────────────────────────────────
plan = PlanIrrigation.objects.create(
    parcelle=p1,
    methode='GOUTTE_A_GOUTTE',
    frequence_jours=3,
    duree_minutes=45,
    heure_debut=time(6, 0),
    volume_m3=12.5,
    actif=True,
    created_by=tech,
)
cycle = CycleIrrigation.objects.create(
    plan=plan,
    date_planifiee=timezone.now() + timedelta(days=1),
    statut='PLANIFIE',
    technicien=tech,
)
print(f"✅ Plan irrigation + cycle créés")

# ─── IoT Sensors ────────────────────────────────────────────────────────────────
s1 = IoTSensor.objects.create(
    sensor_name='Sensor A-1',
    parcelle=p1,
    moisture_level=45.2,
    battery_level=87.5,
    status='ACTIVE'
)
s2 = IoTSensor.objects.create(
    sensor_name='Sensor B-2',
    parcelle=p2,
    moisture_level=22.8,
    battery_level=65.3,
    status='ACTIVE'
)
print(f"✅ IoT Sensors créés : {s1}, {s2}")

# ─── IoT Alerts ─────────────────────────────────────────────────────────────────
alert = IoTAlert.objects.create(
    sensor=s2,
    message=f"Critical water stress detected in {p2.nom}",
    alert_type='CRITICAL'
)
print(f"✅ IoT Alerts créés : {alert}")

print("\n🎉 Seeding terminé avec succès !")
print("=" * 50)
print("Comptes de test :")
print("  Admin      → admin@smartfarming.ma    / Admin123!")
print("  Technicien → tech@smartfarming.ma     / Tech123!")
print("  Farmer     → farmer@smartfarming.ma   / Farmer123!")
print("=" * 50)
