import os
import django
from faker import Faker

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from app.models import Company, Department, Employee

fake = Faker()

def create_companies(num_companies=10):
    companies = []
    for _ in range(num_companies):
        company = Company.objects.create(company_name=fake.company())
        companies.append(company)
    return companies

def create_departments(companies, num_departments=5):
    departments = []
    for company in companies:
        for _ in range(num_departments):
            department = Department.objects.create(
                company=company,
                department_name=fake.word().capitalize() + " Department"
            )
            departments.append(department)
    return departments

def create_employees(departments, num_employees=20):
    for department in departments:
        for _ in range(num_employees):
            Employee.objects.create(
                company=department.company,
                department=department,
                employee_name=fake.name(),
                email_address=fake.email(),
                mobile_number=fake.phone_number(),
                address=fake.address(),
                designation=fake.job(),
                hired_on=fake.date_between(start_date='-5y', end_date='today'),
                employee_status="active"
            )

def main():
    # Create 10 companies
    companies = create_companies(10)
    
    # Create 5 departments for each company
    departments = create_departments(companies, 5)
    
    # Create 20 employees for each department
    create_employees(departments, 20)

    print("Data setup complete!")

if __name__ == "__main__":
    main()