import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from apps.users.models import Utilisateur

print("=== Reset des mots de passe ===\n")

# Reset Admin
admin = Utilisateur.objects.get(email='admin@smartfarming.ma')
admin.set_password('Admin123!')
admin.save()
print("Admin password reset to: Admin123!")

# Reset Agronome
tech = Utilisateur.objects.get(email='tech@smartfarming.ma')
tech.set_password('Tech123!')
tech.save()
print("Agronome password reset to: Tech123!")

# Reset Farmer
farmer = Utilisateur.objects.get(email='farmer@smartfarming.ma')
farmer.set_password('Farmer123!')
farmer.save()
print("Agriculteur password reset to: Farmer123!")

print("\n=== Mots de passes reinitialises avec succes ! ===")
