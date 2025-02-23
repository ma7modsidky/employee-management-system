from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import EmailValidator
# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]
    user_name = models.CharField(max_length=255, unique=True)
    email_address = models.EmailField(unique=True, validators=[EmailValidator()])
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    
    USERNAME_FIELD = 'email_address'
    REQUIRED_FIELDS = ['user_name','role']

    def __str__(self):
        return self.user_name