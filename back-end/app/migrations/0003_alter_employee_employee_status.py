# Generated by Django 5.1.6 on 2025-02-27 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_delete_useraccount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='employee_status',
            field=models.CharField(blank=True, choices=[('active', 'Active'), ('inactive', 'Inactive')], max_length=50, null=True),
        ),
    ]
