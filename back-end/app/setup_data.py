import os
import django
import random
from faker import Faker
from datetime import datetime, timedelta
from .models import Company, Department, Employee  # Update 'myapp' with your actual app name

# Initialize Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')  # Update 'myproject' with your actual project name
django.setup()

fake = Faker()

def create_data():
    # Clear existing data
    Employee.objects.all().delete()
    Department.objects.all().delete()
    Company.objects.all().delete()

    print("✅ Existing data deleted. Creating new records...")

    companies = []
    for _ in range(10):
        company = Company.objects.create(company_name=fake.company())
        companies.append(company)

    print(f"✅ Created {len(companies)} companies.")

    departments = []
    for company in companies:
        for _ in range(5):  # 5 Departments per company
            department = Department.objects.create(
                company=company,
                department_name=fake.bs().title()
            )
            departments.append(department)

    print(f"✅ Created {len(departments)} departments.")

    employees = []
    status_choices = ["active", "inactive"]
    
    for department in departments:
        for _ in range(20):  # 20 Employees per department
            hired_on = fake.date_between(start_date="-5y", end_date="today")  # Hired in the last 5 years
            employee = Employee.objects.create(
                company=department.company,  # Ensure company matches department
                department=department,
                employee_status=random.choice(status_choices),
                employee_name=fake.name(),
                email_address=fake.unique.email(),
                mobile_number=fake.phone_number(),
                address=fake.address(),
                designation=fake.job(),
                hired_on=hired_on
            )
            employees.append(employee)

    print(f"✅ Created {len(employees)} employees.")

    print("🎉 Database successfully populated with sample data!")

if __name__ == "__main__":
    create_data()
