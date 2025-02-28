
# **📌 Project Name**
A Full-Stack **Django + React** Employee Management System Application

---

## **📂 Project Structure**


````bash

/project-root
│── /back-end/       # Django (Backend)
│── /front-end/      # React (Frontend)
│── README.md        # Documentation
````

---

## **🚀 Getting Started**
This guide will help you set up and run the **Django + React** application locally.

---

## **🔹 Prerequisites**
Make sure you have the following installed:

- **Python 3.8+**  
- **Node.js (v16 or later)**  
- **npm or yarn**  
- **Virtualenv**  
- **PostgreSQL/MySQL (if using a database other than SQLite)**  

---

## **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ma7modsidky/employee-management-system.git
cd employee-management-system
````

---

## **2️⃣ Backend Setup (Django)**

Navigate to the backend folder:

```bash
cd ./back-end/
```

### **📌 Create a Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

### **📌 Install Dependencies**

```bash
pip install -r requirements.txt
```

### **📌 Configure Environment Variables**

Create a `.env` file in the **back-end/** directory and add:

```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3  # Change this for PostgreSQL/MySQL
```

If using **PostgreSQL**, install `psycopg2`:

```bash
pip install psycopg2-binary
```

### **📌 Run Database Migrations**

```bash
python manage.py migrate
```

### **📌 Create a Superuser (For Admin Panel)**
You can skip this if you follow the setup data step

```bash
python manage.py createsuperuser
```

Follow the prompts to set up an admin account.

### **📌 Setup data in the project for testing**
Populates the database with different random records and 3 user accounts with different roles admin, manager, employee :
1. admin@ems.com, password=12345
1. manager@ems.com, password=12345
1. employee@ems.com, password=12345


```bash
python setup_data.py
```

### **📌 Start the Django Server**

```bash
python manage.py runserver
```

Your **Django API** should now be running at:\
📌 [**http://127.0.0.1:8000/**](http://127.0.0.1:8000/)

---

## **3️⃣ Frontend Setup (React)**

Open a new terminal and navigate to the frontend folder:

```bash
cd front-end
```

### **📌 Install Dependencies**

```bash
npm install  # or yarn install
```

<!-- ### **📌 Create a **``** File**

Create a `.env` file in the **front-end/** directory and add:

```
REACT_APP_BACKEND_URL=http://127.0.0.1:8000 -->
```

### **📌 Start the React App**

```bash
npm start  # or yarn start
```
or 

```bash
npm run dev  
```

Your **React App** should now be running at:\
📌 [**http://localhost:5173/**](http://localhost:5173/)

---

## **4️⃣ API Documentation (Swagger)**

If Swagger is set up, visit:\
📌 [**http://127.0.0.1:8000/api/docs/**](http://127.0.0.1:8000/api/docs/)

---
Here’s a draft for your `README.md` section explaining the **Role-Based Access Control (RBAC)** logic in your application. You can customize it further based on your project's specifics:

---

## Role-Based Access Control (RBAC)

The application implements a **Role-Based Access Control (RBAC)** system to manage user permissions and ensure secure access to resources. The system defines three primary roles: **Admin**, **Manager**, and **Employee**. Each role has specific permissions for accessing and manipulating resources within the application.

### Roles and Permissions

#### 1. **Admin**
- **Full Access**: Admins have unrestricted access to all resources and actions within the application.
- **Permissions**:
  - Create, read, update, and delete (CRUD) operations on all resources.
  - Manage users, roles, and permissions.
- **Resources**: Company, Departments, Employee, and User.

#### 2. **Manager**
- **Partial Access**: Managers can access and modify most resources but are restricted from performing delete operations.
- **Permissions**:
  - Create, read, and update (CRU) operations on resources.
  - Cannot delete any resources.
- **Resources**: Company, Departments, Employee, and User.

#### 3. **Employee**
- **Limited Access**: Employees have the most restricted access and can only view data related to themselves.
- **Permissions**:
  - Read-only access to their own User details.
  - Cannot create, update, or delete any resources.
  - Cannot view or modify data related to other employees, departments, or companies.
- **Resources**: User (self only).

### Resource Overview

The application manages the following resources, each with role-specific access controls:

1. **Company**:
   - Admins and managers can view, create, update, and (for admins only) delete company details.
   - Employees cannot access company-related data.

2. **Departments**:
   - Admins and managers can view, create, update, and (for admins only) delete department details.
   - Employees cannot access department-related data.

3. **Employee**:
   - Admins and managers can view, create, update, and (for admins only) delete employee records.
   - Employees cannot access other employees' data.

4. **User**:
   - Admins and managers can view, create, update, and (for admins only) delete user accounts.
   - Employees can only view their own user details and cannot edit or delete them.

### Example Workflow

- An **Admin** can:
  - Add a new company, department, or employee.
  - Update or delete any resource.
  - Manage user roles and permissions.

- A **Manager** can:
  - View and update company, department, and employee details.
  - Cannot delete any resources.

- An **Employee** can:
  - View their own user details (e.g., name, email, role).
  - Cannot view or modify any other data in the system.

---

## Role-Based Access Control (RBAC)

The application implements a **Role-Based Access Control (RBAC)** system to manage user permissions and ensure secure access to resources. The system defines three primary roles: **Admin**, **Manager**, and **Employee**. Each role has specific permissions for accessing and manipulating resources within the application.

### Roles and Permissions

#### 1. **Admin**
- **Full Access**: Admins have unrestricted access to all resources and actions within the application.
- **Permissions**:
  - Create, read, update, and delete (CRUD) operations on all resources.
  - Manage users, roles, and permissions.
- **Resources**: Company, Departments, Employee, and User.

#### 2. **Manager**
- **Partial Access**: Managers can access and modify most resources but are restricted from performing delete operations.
- **Permissions**:
  - Create, read, and update (CRU) operations on resources.
  - Cannot delete any resources.
- **Resources**: Company, Departments, Employee, and User.

#### 3. **Employee**
- **Limited Access**: Employees have the most restricted access and can only view data related to themselves.
- **Permissions**:
  - Read-only access to their own User details.
  - Cannot create, update, or delete any resources.
  - Cannot view or modify data related to other employees, departments, or companies.
- **Resources**: User (self only).

### Resource Overview

The application manages the following resources, each with role-specific access controls:

1. **Company**:
   - Admins and managers can view, create, update, and (for admins only) delete company details.
   - Employees cannot access company-related data.

2. **Departments**:
   - Admins and managers can view, create, update, and (for admins only) delete department details.
   - Employees cannot access department-related data.

3. **Employee**:
   - Admins and managers can view, create, update, and (for admins only) delete employee records.
   - Employees cannot access other employees' data.

4. **User**:
   - Admins and managers can view, create, update, and (for admins only) delete user accounts.
   - Employees can only view their own user details and cannot edit or delete them.

### Example Workflow

- An **Admin** can:
  - Add a new company, department, or employee.
  - Update or delete any resource.
  - Manage user roles and permissions.

- A **Manager** can:
  - View and update company, department, and employee details.
  - Cannot delete any resources.

- An **Employee** can:
  - View their own user details (e.g., name, email, role).
  - Cannot view or modify any other data in the system.

---

## **🔹 Useful Commands**

### **Backend**

| Command                            | Description                |
| ---------------------------------- | -------------------------- |
| `python manage.py migrate`         | Apply database migrations  |
| `python manage.py createsuperuser` | Create an admin user       |
| `python manage.py runserver`       | Start Django server        |
| `pip install package_name`         | Install new Python package |

### **Frontend**

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm install`   | Install dependencies             |
| `npm start`     | Start React development server   |
| `npm run build` | Build the project for production |

---

## **✅ Deployment**

For production:

- Use **Gunicorn + Nginx** for Django backend.
- Use **React build** (`npm run build`) and serve it with **NGINX**.
- Configure **PostgreSQL** for production databases.
- Set `DEBUG=False` in Django settings.

---

## **📌 Contributors**

👤 **Your Name**\
GitHub: [@ma7modsidky](https://github.com/ma7modsidky)

---

## **📜 License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

