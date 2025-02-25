from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import EmailValidator
# Create your models here.

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, name, role , password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, name, role , password, **other_fields)

    def create_user(self, email, user_name, name, role , password, **other_fields):

        if not email:
            raise ValueError('You must provide an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          name=name, role=role,**other_fields)
        user.set_password(password)
        user.save()
        return user

    def all(self):
        return super().all()
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]
    user_name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    is_active=models.BooleanField(
        default=True,
        )
    is_staff=models.BooleanField(
        default=False,
        )
    is_admin=models.BooleanField(
        default=False,
        )
    created_at=models.DateTimeField(auto_now_add=True)
    objects = CustomAccountManager()
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name','name','role']

    def __str__(self):
        return self.user_name