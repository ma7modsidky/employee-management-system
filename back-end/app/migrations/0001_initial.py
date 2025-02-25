# Generated by Django 5.1.6 on 2025-02-23 02:04

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255)),
                ('number_of_departments', models.PositiveIntegerField(default=0, editable=False)),
                ('number_of_employees', models.PositiveIntegerField(default=0, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=255)),
                ('email_address', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('manager', 'Manager'), ('employee', 'Employee')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department_name', models.CharField(max_length=255)),
                ('number_of_employees', models.PositiveIntegerField(default=0, editable=False)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='departments', to='app.company')),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive')], max_length=50)),
                ('employee_name', models.CharField(max_length=255)),
                ('email_address', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('mobile_number', models.CharField(max_length=15, validators=[django.core.validators.RegexValidator('^\\+?1?\\d{9,15}$')])),
                ('address', models.TextField()),
                ('designation', models.CharField(max_length=255)),
                ('hired_on', models.DateField(blank=True, null=True)),
                ('days_employed', models.PositiveIntegerField(default=0, editable=False)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='app.company')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='app.department')),
            ],
        ),
    ]
