import os
import django
from faker import Faker
import uuid

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from app.models import Company, Department, Employee
from users.models import User

fake = Faker()
def generate_phone_number():
    # Generate a phone number in a consistent format: (XXX) XXX-XXXX
    area_code = fake.numerify(text="###")  # Random 3-digit area code
    exchange_code = fake.numerify(text="###")  # Random 3-digit exchange code
    subscriber_number = fake.numerify(text="####")  # Random 4-digit subscriber number
    return f"({area_code}) {exchange_code}-{subscriber_number}"
def create_companies(num_companies=10):
    companies = []
    for _ in range(num_companies):
        company = Company.objects.create(company_name=fake.company())
        companies.append(company)
    print(f"✅ Created {len(companies)} companies.")    
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
    print(f"✅ Created {len(departments)} departments.")        
    return departments

def create_employees(departments, num_employees=20):
    for department in departments:
        for _ in range(num_employees):
            # Generate a unique email address by appending a UUID
            unique_email = f"{fake.user_name()}_{uuid.uuid4().hex[:6]}@ems.com"
            Employee.objects.create(
                company=department.company,
                department=department,
                employee_name=fake.name(),
                email_address=unique_email,  # Use the unique email address
                mobile_number=generate_phone_number(),  # Use the custom phone number generator
                address=fake.address(),
                designation=fake.job(),
                hired_on=fake.date_between(start_date='-5y', end_date='today'),
                employee_status="active"
            )
    print(f"✅ Created  employees.")

    print("🎉 Database successfully populated with sample data!")

def create_users():
    # Delete users
    User.objects.all().delete()
    print("Deleted all users")
    
    # Create admin user
    User.objects.create_user(
        email="admin@ems.com",
        user_name="admin",
        name="Admin User",
        role="admin",
        password="12345"
    )

    # Create manager user
    User.objects.create_user(
        email="manager@ems.com",
        user_name="manager",
        name="Manager User",
        role="manager",
        password="12345"
    )

    # Create employee user
    User.objects.create_user(
        email="employee@ems.com",
        user_name="employee",
        name="Employee User",
        role="employee",
        password="12345"
    )
    print("Successfully created 3 users admin , manager, employee. please use admin@ems.com and password 12345 for testing")

def main():
    # Clear existing data
    Employee.objects.all().delete()
    Department.objects.all().delete()
    Company.objects.all().delete()

    print("✅ Existing data deleted. Creating new records...")

    # Create 10 companies
    companies = create_companies(10)
    
    # Create 5 departments for each company
    departments = create_departments(companies, 5)
    
    # Create 20 employees for each department
    create_employees(departments, 20)
    
    create_users()

    print("Data setup complete!")
    
    

if __name__ == "__main__":
    main()