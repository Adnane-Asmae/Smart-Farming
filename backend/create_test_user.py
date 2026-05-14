import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_farming.settings')
django.setup()

from apps.users.models import Utilisateur

# Create a test admin user
if not Utilisateur.objects.filter(email='admin@smartfarming.ma').exists():
    user = Utilisateur.objects.create_superuser(
        email='admin@smartfarming.ma',
        password='Admin1234!',
        nom='Admin',
        prenom='Super',
        role='ADMIN'
    )
    print(f"Test user created successfully!")
    print(f"Email: admin@smartfarming.ma")
    print(f"Password: Admin1234!")
else:
    print("Test user already exists!")
    print(f"Email: admin@smartfarming.ma")
    print(f"Password: Admin1234!")
