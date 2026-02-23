# HRMS Lite - Human Resource Management System

## 📋 Project Overview

HRMS Lite is a lightweight Human Resource Management System built with **microservices architecture**. It provides essential HR functionalities including employee management and attendance tracking through independent, scalable services.

**Key Features:**
- **Admin Authentication** (Login/Signup with JWT)
- Employee Management (Add, View, Delete)
- Attendance Management (Mark, View, Filter)
- Real-time Dashboard Statistics
- Professional, Production-Ready UI
- RESTful APIs with Validation
- Microservices Architecture

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with modern design

### Backend
- **Framework**: Django 4.2.7
- **API**: Django REST Framework 3.14.0
- **Language**: Python 3.11+
- **Server**: Gunicorn (production)

### Database
- **Local Development**: SQLite 3
- **Production**: PostgreSQL 15
- **Pattern**: Database-per-service (microservices)

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Containerization**: Docker (optional)

---

## 🚀 Steps to Run the Project Locally

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- Git

### Option 1: Quick Start (Recommended)

**Windows:**
```bash
start.bat
```

This will automatically start all three services in separate terminal windows.

### Option 2: Manual Setup

#### Step 1: Clone Repository
```bash
git clone <repository-url>
cd Hrms
```

#### Step 2: Setup Employee Service
```bash
cd employee-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver 8000
```

#### Step 3: Setup Attendance Service
Open a new terminal:
```bash
cd attendance-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver 8001
```

#### Step 4: Setup Frontend
Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Employee API**: http://localhost:8000/api/employees/
- **Attendance API**: http://localhost:8001/api/attendance/

### First Time Setup - Create Admin Account

1. Open http://localhost:5173 in your browser
2. You'll be redirected to the **Login page**
3. Click **"Sign Up"** link
4. Enter your credentials:
   - Username: `admin` (or any username)
   - Email: `admin@hrms.com` (optional)
   - Password: `admin123` (minimum 8 characters)
5. Click **"Sign Up"** button
6. You'll be automatically logged in and redirected to the Dashboard

### Subsequent Logins

1. Open http://localhost:5173
2. Enter your username and password
3. Click **"Login"** button
4. Access the application

**Note**: All routes are protected and require authentication. You must login to access Employee Management, Attendance, and Dashboard features.

---

## 🧪 Testing the Application

### 1. First Login
1. Open http://localhost:5173 in your browser
2. Click **"Sign Up"** to create admin account
3. Enter username, email (optional), and password
4. Click **"Sign Up"** - you'll be logged in automatically

### 2. Add Employees
1. Navigate to **Employees** page
2. Add a new employee:
   - Employee ID: EMP001
   - Full Name: John Doe
   - Email: john@example.com
   - Department: IT
3. Click **"Add Employee"**

### 3. Mark Attendance
1. Navigate to **Attendance** page
2. Select employee from dropdown
3. Choose date and status (Present/Absent)
4. Click **"Mark Attendance"**

### 4. Use Filters
1. Filter attendance by date
2. Filter by specific employee
3. View all records

### 5. Check Dashboard
1. Navigate to **Dashboard**
2. View total employees count
3. View present today count

### 6. Logout
1. Click **"Logout"** button in top-right corner
2. You'll be redirected to login page

---

## 📁 Project Structure

```
Hrms/
├── employee-service/          # Employee microservice (Port 8000)
│   ├── employees/            # Django app
│   ├── employee_service/     # Django project settings
│   ├── db.sqlite3           # Local database
│   ├── requirements.txt     # Python dependencies
│   └── manage.py
├── attendance-service/        # Attendance microservice (Port 8001)
│   ├── attendance/          # Django app
│   ├── attendance_service/  # Django project settings
│   ├── db.sqlite3          # Local database
│   ├── requirements.txt    # Python dependencies
│   └── manage.py
├── frontend/                  # React application (Port 5173)
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API integration
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── start.bat                  # Quick start script
└── README.md                  # This file
```

---

## 🏗️ Architecture

**Microservices Pattern:**
```
Frontend (React)
    ↓
    ├─→ Employee Service (Django:8000) → SQLite DB
    └─→ Attendance Service (Django:8001) → SQLite DB
```

**Key Design Decisions:**
- Independent services with separate databases
- REST API communication between services
- Each service can be deployed and scaled independently
- CORS-enabled for frontend integration

---

## ⚠️ Assumptions and Limitations

### Assumptions
1. **Admin Authentication**: JWT-based authentication for admin users
2. **Single Admin Role**: All authenticated users have admin privileges
3. **Simple Workflow**: Focus on core HR operations only
4. **Local Development**: SQLite used for ease of setup (PostgreSQL for production)
5. **Date Validation**: Attendance can only be marked for current or past dates
6. **Unique Constraints**: Each employee must have unique Employee ID and Email
7. **One Attendance Per Day**: Only one attendance record per employee per day
8. **Token Expiry**: JWT tokens expire after 24 hours

### Limitations
1. **Single Role**: Only admin role, no role-based access control
2. **No Employee Edit**: Can only add or delete employees (not edit)
3. **No Attendance Edit/Delete**: Once marked, attendance cannot be modified
4. **No Leave Management**: Leave requests/approvals not included
5. **No Payroll**: Salary and payment features not included
6. **No Reports**: Advanced reporting and analytics not included
7. **No Email Notifications**: No automated email system
8. **No File Uploads**: No document/photo upload functionality
9. **No Password Reset**: Password reset functionality not implemented

### Technical Limitations
1. **Development Server**: Django development server used (Gunicorn for production)
2. **SQLite**: Used locally (not suitable for high-concurrency production)
3. **No Caching**: No Redis or caching layer implemented
4. **No Message Queue**: Direct HTTP calls between services (no RabbitMQ/Kafka)
5. **No API Gateway**: Services accessed directly (Kong/Nginx recommended for production)

---

## 🔌 API Endpoints

### Authentication Endpoints
```
POST   /api/auth/signup/            # Create admin account
POST   /api/auth/login/             # Login and get JWT token
```

**Signup Request:**
```json
{
  "username": "admin",
  "password": "admin123",
  "email": "admin@hrms.com"
}
```

**Login Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access": "<jwt-token>",
  "refresh": "<refresh-token>",
  "username": "admin"
}
```

### Employee Service (Port 8000)
**Note**: All endpoints require JWT authentication (Bearer token in Authorization header)

```
GET    /api/employees/              # List all employees
POST   /api/employees/              # Create employee
GET    /api/employees/{id}/         # Get employee by ID
DELETE /api/employees/{id}/         # Delete employee
GET    /api/employees/by_employee_id/?employee_id=X  # Get by employee_id
```

### Attendance Service (Port 8001)
```
GET    /api/attendance/             # List all attendance
POST   /api/attendance/             # Mark attendance
GET    /api/attendance/?employee_id=X  # Filter by employee
GET    /api/attendance/?date=Y      # Filter by date
GET    /api/attendance/summary/?employee_id=X  # Get summary
```

---

## 🚀 Deployment

### Production Deployment

For production deployment to Render (backend) and Vercel (frontend), see:
- **DEPLOYMENT.md** - Step-by-step deployment guide
- **requirements-prod.txt** - Production dependencies with PostgreSQL

### Quick Deploy

**Backend (Render):**
1. Push code to GitHub
2. Create Render web services
3. Add PostgreSQL databases
4. Set environment variables
5. Deploy

**Frontend (Vercel):**
```bash
cd frontend
npm run build
vercel --prod
```


## 🆘 Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Module not found:**
```bash
cd employee-service
venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend issues:**
```bash
cd frontend
npm install
```

**Database issues:**
```bash
python manage.py migrate
```

---

## 📧 Support

For issues or questions:
1. Check documentation files
2. Review error messages in terminal
3. Verify all services are running
4. Check environment variables

---

## 📄 License

This project is created for educational purposes as part of a full-stack coding assignment.

---


**Tech Stack**: Django + React + PostgreSQL/SQLite

**Architecture**: Microservices with REST APIs
