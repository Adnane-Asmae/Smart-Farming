"""
App Users - Modèle utilisateur custom (Admin, Technicien, Farmer)
"""

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UtilisateurManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'email est obligatoire.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'ADMIN')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class Utilisateur(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = [
        ('ADMIN', 'Administrateur'),
        ('TECHNICIEN', 'Technicien / Agronome'),
        ('FARMER', 'Agriculteur'),
    ]

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=180, unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='FARMER')
    statut = models.BooleanField(default=True)  # True = actif
    date_creation = models.DateTimeField(auto_now_add=True)

    # Champs requis par Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UtilisateurManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'role']

    class Meta:
        db_table = 'utilisateurs'
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.role})"

    @property
    def full_name(self):
        return f"{self.prenom} {self.nom}"
