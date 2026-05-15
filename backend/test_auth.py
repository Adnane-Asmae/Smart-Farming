import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from django.contrib.auth import authenticate

print("=== Test de la fonction authenticate ===")

# Test Admin
print("\n--- Test Admin ---")
user = authenticate(email='admin@smartfarming.ma', password='Admin123!')
if user:
    print(f"SUCCESS: Authentifié ! {user}")
    print(f"is_active: {user.is_active}, statut: {user.statut}")
else:
    print("ECHEC: Aucun utilisateur trouvé ou mot de passe incorrect !")

# Test Agronome
print("\n--- Test Agronome ---")
user = authenticate(email='tech@smartfarming.ma', password='Tech123!')
if user:
    print(f"SUCCESS: Authentifié ! {user}")
    print(f"is_active: {user.is_active}, statut: {user.statut}")
else:
    print("ECHEC: Aucun utilisateur trouvé ou mot de passe incorrect !")

# Test Farmer
print("\n--- Test Agriculteur ---")
user = authenticate(email='farmer@smartfarming.ma', password='Farmer123!')
if user:
    print(f"SUCCESS: Authentifié ! {user}")
    print(f"is_active: {user.is_active}, statut: {user.statut}")
else:
    print("ECHEC: Aucun utilisateur trouvé ou mot de passe incorrect !")
