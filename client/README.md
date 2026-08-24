# CRM SaaS Portal

A web-based CRM SaaS platform designed to help organizations manage employees and day-to-day CRM operations through separate Organization Admin and Employee interfaces.

The application follows a client-server architecture with a React frontend, Node.js/Express backend, and PostgreSQL database.

---

# About the CRM Portal

The CRM SaaS Portal is designed to help organizations manage their employees and customer relationship activities from a centralized platform.

The application provides two main interfaces:

- Organization Admin Portal
- Employee CRM Portal

Organization administrators can manage employees, invitations, organization settings, and organization profile information.

Employees can manage CRM-related operations such as Leads, Customers, Deals, Tasks, Activities, Notes, Notifications, and their Profile.

The application uses role-based authentication and protected routes so that users are redirected to the appropriate dashboard based on their role.

---

# Use Case

The main purpose of the CRM Portal is to provide organizations with a centralized system for managing CRM operations.

The Employee CRM interface allows employees to:

- View CRM dashboard analytics
- Manage leads
- Manage customers
- Manage deals
- Manage tasks
- Track activities
- Create and manage notes
- View notifications
- Manage employee profile information

The Organization Admin interface allows administrators to:

- View organization dashboard information
- View employees
- Manage employee invitations
- Configure organization settings
- View and manage organization profile information

The application stores CRM information in PostgreSQL and communicates between the frontend and backend using REST APIs.

---

# Target Audience

The CRM Portal is intended for:

- Organization Administrators
- Sales Managers
- Sales Executives
- Support Agents
- Employees working with customer and sales information
- Organizations that require centralized CRM management

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React
- JavaScript

## Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs

## Database

- PostgreSQL

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- Nodemon
- npm

---

# Frontend Setup

## Prerequisites

Install the following before running the application:

- Node.js
- npm
- PostgreSQL
- Git

Verify the installation:

```bash
node --version
npm --version
psql --version
git --version
````

---

# Clone the Repository

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd Shnoor-crm-portal
```

---

# Frontend Installation

Open a terminal and navigate to the client directory:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

# Frontend Configuration

The frontend communicates with the backend through Axios.

The API configuration is located at:

```text
client/src/services/api.js
```

The current development API base URL is:

```text
http://localhost:5000/api
```

The frontend sends the authenticated JWT token with protected API requests.

The token is stored on the client and attached to requests using the Axios request interceptor.

No Firebase configuration is currently required by the frontend implementation.

---

# Authentication Flow

The application uses JWT-based authentication.

The general flow is:

```text
Open Application
      |
      v
Landing Page
      |
      v
Login
      |
      v
Enter Credentials
      |
      v
POST /api/auth/login
      |
      v
Backend Validates Credentials
      |
      v
JWT Token Generated
      |
      v
Token Stored on Client
      |
      v
Role Identified
      |
      +----------------------+
      |                      |
      v                      v
ORG_ADMIN              Employee Role
      |                      |
      v                      v
Organization          Employee Dashboard
Dashboard
```

Supported employee roles include:

```text
SALES_MANAGER
SALES_EXECUTIVE
SUPPORT_AGENT
```

The organization administrator role is:

```text
ORG_ADMIN
```

---

# Frontend Routing

The application uses React Router.

## Public Routes

```text
/
 /login
 /signup
 /accept-invitation/:token
```

## Organization Admin Routes

```text
/organization
/organization/employees
/organization/invitations
/organization/settings
/organization/profile
```

## Employee Routes

```text
/employee
/employee/leads
/employee/customers
/employee/deals
/employee/tasks
/employee/activities
/employee/notes
/employee/notifications
/employee/profile
```

Employee routes are protected using role-based route protection.

---

# Employee Dashboard

The Employee Dashboard is the main CRM workspace for authenticated employees.

The dashboard provides:

* Total Leads
* New Leads
* Total Customers
* Active Deals
* Pending Tasks
* Won Deals
* Revenue
* Leads by Source
* Deals by Stage
* Revenue Trend
* Upcoming Tasks
* Recent Activities

Dashboard information is retrieved from the backend through:

```text
GET /api/employee/dashboard
```

The dashboard data is based on the authenticated employee and organization.

---

# Employee CRM Modules

## 1. Leads

Employee lead management provides:

* View leads
* Create leads
* Update leads
* Delete leads
* Search leads
* Filter leads
* Track lead status
* Store lead information in PostgreSQL

API endpoints:

```text
GET    /api/employee/leads
GET    /api/employee/leads/:id
POST   /api/employee/leads
PUT    /api/employee/leads/:id
DELETE /api/employee/leads/:id
```

Lead information includes:

* Name
* Company
* Email
* Phone
* Status
* Source
* Value

---

# 2. Customers

The Customers module provides:

* View customers
* Create customers
* Update customers
* Delete customers
* Search customers
* Filter customers
* Store customer information in PostgreSQL

API endpoints:

```text
GET    /api/employee/customers
GET    /api/employee/customers/:id
POST   /api/employee/customers
PUT    /api/employee/customers/:id
DELETE /api/employee/customers/:id
```

Customer information includes:

* Name
* Company
* Email
* Phone
* Status
* Industry
* Total Spend
* Customer Since

---

# 3. Deals

The Deals module provides sales pipeline management.

Employees can:

* View deals
* Create deals
* Update deals
* Move deals between stages
* Track deal values
* Associate deals with customers

API endpoints:

```text
GET    /api/employee/deals
GET    /api/employee/deals/:id
POST   /api/employee/deals
PUT    /api/employee/deals/:id
DELETE /api/employee/deals/:id
```

Deal stages include:

```text
New
Qualified
Proposal
Negotiation
Won
Lost
```

The frontend provides a Kanban-style deal pipeline.

---

# 4. Tasks

Employees can manage CRM tasks.

Features include:

* View tasks
* Create tasks
* Update tasks
* Delete tasks
* Change task status
* Track task priority
* Track due dates
* Search tasks
* Filter tasks

API endpoints:

```text
GET    /api/employee/tasks
GET    /api/employee/tasks/:id
POST   /api/employee/tasks
PUT    /api/employee/tasks/:id
DELETE /api/employee/tasks/:id
```

Task statuses:

```text
Pending
In Progress
Completed
```

Task priorities:

```text
Low
Medium
High
```

---

# 5. Activities

The Activities section allows employees to view CRM activities associated with their records.

API endpoints:

```text
GET    /api/employee/activities
POST   /api/employee/activities
PUT    /api/employee/activities/:id
DELETE /api/employee/activities/:id
```

Activities can contain:

* Activity title
* Related CRM record
* Activity type
* Date and time
* Employee ownership

---

# 6. Notes

Employees can create and manage CRM notes.

Features include:

* View notes
* Create notes
* Delete notes
* Search notes
* Associate notes with CRM records

API endpoints:

```text
GET    /api/employee/notes
POST   /api/employee/notes
PUT    /api/employee/notes/:id
DELETE /api/employee/notes/:id
```

Notes can be associated with:

```text
Lead
Customer
Deal
```

---

# 7. Notifications

The Notifications module retrieves employee-specific notifications.

Features include:

* View notifications
* View read/unread status
* Mark individual notification as read
* Mark all notifications as read

API endpoints:

```text
GET /api/employee/notifications
PUT /api/employee/notifications/:id/read
PUT /api/employee/notifications/read-all
```

---

# 8. Employee Profile

Employees can view and update their profile information.

Profile information includes:

* Name
* Email
* Role
* Account Status
* Phone
* Department
* Location
* Organization
* Account Creation Date
* Last Login Information

API endpoints:

```text
GET /api/employee/profile
PUT /api/employee/profile
```

Profile changes are persisted through the backend and PostgreSQL.

---

# Frontend API Integration

The frontend API integration is organized through service files.

Main frontend services:

```text
client/src/services/api.js
client/src/services/authService.js
client/src/services/employeeService.js
client/src/services/organizationService.js
```

Employee API operations are centralized in:

```text
client/src/services/employeeService.js
```

This service handles API communication for:

* Dashboard
* Profile
* Leads
* Customers
* Deals
* Tasks
* Activities
* Notes
* Notifications

---

# Frontend Project Structure

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── employee/
│   │   └── organization/
│   ├── context/
│   ├── mock/
│   ├── pages/
│   │   ├── employee/
│   │   └── organization/
│   ├── routes/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

# Frontend Components

Reusable employee components include:

* Employee Layout
* Sidebar
* Topbar
* Stat Card
* Modal
* Empty State
* Pagination
* Filter Select
* List Toolbar
* Row Actions
* Status Badge
* Table Skeleton
* Charts

These components are used to maintain a consistent UI across employee CRM modules.

---

# Backend Integration Flow

The frontend communicates with the backend using REST APIs.

General request flow:

```text
React Page
    |
    v
Frontend Service
    |
    v
Axios
    |
    v
JWT Authorization Header
    |
    v
Express Route
    |
    v
Authentication Middleware
    |
    v
Role Authorization
    |
    v
Controller
    |
    v
Service
    |
    v
PostgreSQL
    |
    v
API Response
    |
    v
React UI
```

---

# Data Security and Access Control

Protected requests use:

```text
Authorization: Bearer <JWT>
```

The backend validates the JWT before processing protected requests.

Employee routes are restricted to authenticated employee roles.

Employee CRM records are scoped using organization and employee ownership information.

This provides organization-level data isolation and employee-specific CRM access.

---

# Organization Admin Flow

```text
Application
    |
    v
Login
    |
    v
Organization Admin Credentials
    |
    v
Organization Dashboard
    |
    +--> Employees
    |
    +--> Invitations
    |
    +--> Organization Settings
    |
    +--> Profile
    |
    v
Logout
```

---

# Employee Flow

```text
Application
    |
    v
Login
    |
    v
Employee Credentials
    |
    v
JWT Authentication
    |
    v
Employee Role Validation
    |
    v
Employee Dashboard
    |
    +--> Leads
    |
    +--> Customers
    |
    +--> Deals
    |
    +--> Tasks
    |
    +--> Activities
    |
    +--> Notes
    |
    +--> Notifications
    |
    +--> Profile
    |
    v
Logout
```

---

# Local Development

Start PostgreSQL first.

Then start the backend:

```bash
cd server
npm install
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

Open another terminal and start the frontend:

```bash
cd client
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Both frontend and backend must be running for the integrated CRM modules to work.

---

# Testing Flow

## Authentication Test

1. Open the application.
2. Navigate to Login.
3. Enter valid credentials.
4. Verify that the correct dashboard opens based on the user role.
5. Verify that protected routes cannot be accessed with an unauthorized role.

## Employee Dashboard Test

1. Login with an employee account.
2. Open Employee Dashboard.
3. Verify dashboard metrics.
4. Open Leads.
5. Create a lead.
6. Edit the lead.
7. Delete the lead.
8. Verify the changes are reflected through the backend.
9. Repeat the same process for Customers, Deals and Tasks.
10. Create and view Notes.
11. Open Activities.
12. Open Notifications.
13. Mark a notification as read.
14. Open Profile.
15. Update profile information.
16. Navigate to another section and return to Profile.
17. Verify that the updated information is retrieved from the backend.

---

# Current Implementation Status

## Organization Admin

* [x] Authentication
* [x] JWT authentication
* [x] Protected routes
* [x] Organization dashboard
* [x] Employee listing
* [x] Employee invitations
* [x] Organization settings
* [x] Organization profile

## Employee Dashboard

* [x] Employee dashboard frontend
* [x] Employee dashboard backend integration
* [x] PostgreSQL integration
* [x] Role-based protected routes
* [x] Dashboard analytics
* [x] Lead management
* [x] Customer management
* [x] Deal management
* [x] Task management
* [x] Activity integration
* [x] Notes integration
* [x] Notifications integration
* [x] Employee profile integration
* [x] Employee-specific data handling
* [x] Organization-level data isolation
* [x] REST API integration

---

# Work Completed by Gowri

The Employee Dashboard implementation and integration work includes:

* Employee Dashboard frontend implementation
* Employee Dashboard backend integration
* PostgreSQL integration for employee CRM data
* Employee role-based authentication and authorization
* Dashboard analytics integration
* Lead management integration
* Customer management integration
* Deal management integration
* Task management integration
* Activity integration
* Notes integration
* Notifications integration
* Employee profile integration
* Employee REST API integration
* Employee-specific data filtering
* Organization-level data isolation
* Frontend API service integration
* Employee route integration
* Employee controller integration
* Employee service integration

---

# Files Related to Employee Dashboard

Frontend pages:

```text
client/src/pages/employee/DashboardHome.jsx
client/src/pages/employee/Leads.jsx
client/src/pages/employee/Customers.jsx
client/src/pages/employee/Deals.jsx
client/src/pages/employee/Tasks.jsx
client/src/pages/employee/Activities.jsx
client/src/pages/employee/Notes.jsx
client/src/pages/employee/Notifications.jsx
client/src/pages/employee/Profile.jsx
```

Frontend services:

```text
client/src/services/api.js
client/src/services/employeeService.js
```

Routing:

```text
client/src/routes/AppRoutes.jsx
```

Authentication:

```text
client/src/context/AuthContext.jsx
```

Employee UI components:

```text
client/src/components/employee/
```

---

# Database

The application uses PostgreSQL.

Database schema:

```text
server/database/schema.sql
```

Database initialization:

```text
server/database/initDb.js
```

Main entities include:

```text
organizations
users
invitations
leads
customers
deals
tasks
activities
notes
notifications
```

---

# Important Configuration

Backend environment variables are configured in:

```text
server/.env
```

Example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crm
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
JWT_SECRET=JWT_SECRET
JWT_EXPIRES_IN=1d
```

Do not commit real database credentials or secrets to GitHub.

---

# Project Status

The CRM Portal currently contains both Organization Admin and Employee CRM interfaces.

The Employee Dashboard has been integrated with the backend and PostgreSQL for the implemented CRM modules.

The frontend uses reusable React components, protected routing, Axios-based API communication, JWT authentication, and role-based access control.

---

# Future Enhancements

Potential future improvements include:

* Email-based employee invitation delivery
* Advanced CRM search
* Advanced filtering
* CRM reporting
* Organization analytics
* Audit tracking
* Email notifications
* Password management
* Production deployment configuration
* Additional security hardening`
