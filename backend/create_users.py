import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from django.utils import timezone
from apps.users.models import Utilisateur

print("Creation des utilisateurs Smart Farming...")

# Supprimer les utilisateurs existants pour eviter les doublons
Utilisateur.objects.filter(email__in=['admin@smartfarming.ma', 'tech@smartfarming.ma', 'farmer@smartfarming.ma']).delete()

# Creer Admin
admin = Utilisateur.objects.create_superuser(
    email='admin@smartfarming.ma',
    password='Admin123!',
    nom='Benali',
    prenom='Karim',
    role='ADMIN'
)
print(f"Admin cree : {admin}")

# Creer Technicien/Agronome
tech = Utilisateur.objects.create_user(
    email='tech@smartfarming.ma',
    password='Tech123!',
    nom='El Idrissi',
    prenom='Youssef',
    role='TECHNICIEN'
)
print(f"Agronome cree : {tech}")

# Creer Farmer
farmer = Utilisateur.objects.create_user(
    email='farmer@smartfarming.ma',
    password='Farmer123!',
    nom='Ouazzani',
    prenom='Hassan',
    role='FARMER'
)
print(f"Agriculteur cree : {farmer}")

print("\nTous les utilisateurs ont ete crees avec succes !")
print("\nIdentifiants :")
print("Admin: admin@smartfarming.ma / Admin123!")
print("Agronome: tech@smartfarming.ma / Tech123!")
print("Agriculteur: farmer@smartfarming.ma / Farmer123!")
