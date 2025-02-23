from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import EmailValidator, RegexValidator
from django.utils import timezone
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from datetime import date


class Company(models.Model):
    company_name = models.CharField(max_length=255)
    number_of_departments = models.PositiveIntegerField(default=0, editable=False)
    number_of_employees = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.company_name

class Department(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='departments')
    department_name = models.CharField(max_length=255)
    number_of_employees = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.department_name

class Employee(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')
    employee_status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    employee_name = models.CharField(max_length=255)
    email_address = models.EmailField(unique=True, validators=[EmailValidator()])
    mobile_number = models.CharField(max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])
    address = models.TextField()
    designation = models.CharField(max_length=255)
    hired_on = models.DateField(null=True, blank=True)
    days_employed = models.PositiveIntegerField(default=0, editable=False)

    def save(self, *args, **kwargs):
        if self.hired_on:
            self.days_employed = (date.today() - self.hired_on).days
        super().save(*args, **kwargs)

    def __str__(self):
        return self.employee_name

# Signals to update counts
@receiver(post_save, sender=Department)
@receiver(post_delete, sender=Department)
def update_company_department_count(sender, instance, **kwargs):
    company = instance.company
    company.number_of_departments = company.departments.count()
    company.save()

@receiver(post_save, sender=Employee)
@receiver(post_delete, sender=Employee)
def update_counts(sender, instance, **kwargs):
    company = instance.company
    department = instance.department
    company.number_of_employees = company.employees.count()
    department.number_of_employees = department.employees.count()
    company.save()
    department.save()