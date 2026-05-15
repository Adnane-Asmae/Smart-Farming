import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from apps.users.models import Utilisateur

print("=== Verification des utilisateurs dans la base de donnees ===\n")

users = Utilisateur.objects.all()

if not users:
    print("Aucun utilisateur trouve !")
else:
    print(f"{len(users)} utilisateur(s) trouve(s) :\n")
    for user in users:
        print(f"  - {user.prenom} {user.nom}")
        print(f"    Email: {user.email}")
        print(f"    Role: {user.role}")
        print(f"    Statut: {'Actif' if user.statut else 'Inactif'}")
        print(f"    is_active: {'True' if user.is_active else 'False'}")
        print()
