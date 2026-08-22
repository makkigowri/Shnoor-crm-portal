# CRM SaaS Portal

A web-based CRM SaaS platform designed to help organizations manage employees and CRM operations through separate organization-admin and employee interfaces.

The application follows a client-server architecture with a React frontend, Node.js/Express backend, and PostgreSQL database.

---

## Project Overview

The CRM platform provides separate functionality for:

- Organization Administrators
- Employees / CRM Users

Organization administrators can manage their organization and employees, while employees can work with CRM-related operations such as leads, customers, deals, tasks, activities, notes, and notifications.

The application supports authentication, role-based access control, organization-level data isolation, CRM operations, dashboard analytics, and PostgreSQL-based data persistence.

The project is being developed collaboratively, with frontend and backend functionality being added incrementally.

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs
- bcryptjs

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- Postman
- Nodemon
- pg

---

## Project Structure

```text
CRM/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── employee/
│   │   │   └── organization/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── employee/
│   │   │   └── organization/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
````

---

# Prerequisites

Install:

* Node.js
* npm
* PostgreSQL
* Git

Verify:

```bash
node --version
npm --version
psql --version
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd Shnoor-crm-portal
```

---

# Backend Setup

Navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

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

Do not commit `.env` or credentials to GitHub.

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Database

The project uses PostgreSQL for persistent data storage.

Schema:

```text
server/database/schema.sql
```

Database initialization:

```text
server/database/initDb.js
```

The database contains organization, user, invitation, and employee CRM entities.

Current entities include:

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

### Organizations

Stores:

* Organization ID
* Organization name
* Organization status
* Creation/update timestamps

### Users

Stores organization administrators and employees.

Important attributes include:

* User ID
* Organization ID
* Name
* Email
* Password hash
* Role
* Status
* Phone
* Department
* Location
* Login information

Supported roles:

```text
ORG_ADMIN
SALES_MANAGER
SALES_EXECUTIVE
SUPPORT_AGENT
```

### Invitations

Stores employee invitation information including:

* Organization
* Employee email
* Assigned role
* Invitation token
* Expiration
* Status
* Inviting administrator
* Acceptance information

### Leads

Stores employee-owned lead information including:

* Lead name
* Company
* Email
* Phone
* Status
* Source
* Value
* Organization
* Owner

### Customers

Stores employee-owned customer information including:

* Customer name
* Company
* Email
* Phone
* Status
* Industry
* Total spend
* Customer since
* Organization
* Owner

### Deals

Stores sales deal information including:

* Deal title
* Company
* Customer
* Stage
* Value
* Close date
* Organization
* Owner

### Tasks

Stores employee tasks including:

* Task title
* Related record
* Type
* Priority
* Status
* Due date
* Organization
* Owner

### Activities

Stores CRM activity information including:

* Activity title
* Related record
* Activity type
* Occurred date/time
* Organization
* Owner

### Notes

Stores CRM notes including:

* Related record
* Related record type
* Note content
* Author
* Organization

### Notifications

Stores user-specific CRM notifications including:

* Notification type
* Title
* Description
* Read/unread status
* User
* Organization
* Creation timestamp

---

# Application Architecture

The application follows a layered client-server architecture.

```text
React Frontend
      |
      | Axios / REST API
      v
Express Routes
      |
      v
Authentication Middleware
      |
      v
Role Authorization Middleware
      |
      v
Controllers
      |
      v
Services
      |
      v
PostgreSQL
```

Frontend responsibilities:

* UI
* Routing
* Authentication state
* API communication
* Page-level functionality
* Dashboard rendering
* Form handling

Backend responsibilities:

* API endpoints
* Authentication
* Authorization
* Business logic
* Database operations
* Organization-level data isolation
* Employee-level data filtering

---

# Authentication

Authentication is implemented using JWT.

General flow:

```text
Login
  |
  v
Authentication API
  |
  v
Credentials Validation
  |
  v
Password Verification
  |
  v
JWT Generation
  |
  v
Token Stored on Client
  |
  v
Role-Based Redirect
  |
  +----------------------+
  |                      |
  v                      v
ORG_ADMIN              Employee Role
  |                      |
  v                      v
Organization          Employee
Dashboard             Dashboard
```

Protected requests use:

```text
Authorization: Bearer <token>
```

The backend authentication middleware validates the token and makes authenticated user information available to protected requests.

Role-based authorization ensures that organization-admin routes and employee routes are accessed only by the appropriate user roles.

---

# Protected Routes

The organization-admin section is available under:

```text
/organization
```

Current routes:

```text
/organization
/organization/employees
/organization/invitations
/organization/settings
/organization/profile
```

The employee section is available under:

```text
/employee
```

Employee routes include:

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

---

# Organization Admin Portal

The Organization Admin portal has a dedicated layout and sidebar.

Layout:

```text
client/src/components/organization/OrganizationLayout.jsx
```

Sidebar:

```text
client/src/components/organization/OrganizationSidebar.jsx
```

Current navigation:

* Dashboard
* Employees
* Invitations
* Organization Settings
* Profile
* Logout

---

# Organization Dashboard

Frontend:

```text
client/src/pages/organization/OrganizationDashboard.jsx
```

Current dashboard information:

* Total Employees
* Active Employees
* Inactive Employees
* Pending Invitations

Dashboard data is retrieved from the backend.

---

# Employee Management

Frontend:

```text
client/src/pages/organization/EmployeesPage.jsx
```

API:

```text
GET /api/organization/employees
```

Current functionality:

* View employees
* Search employees
* View employee roles
* View employee status

---

# Employee Invitations

Frontend:

```text
client/src/pages/organization/InvitationsPage.jsx
```

APIs:

```text
GET  /api/organization/invitations
POST /api/organization/invitations
```

Current functionality:

* Create employee invitations
* Select employee roles
* View invitations
* Track invitation status
* Track invitation expiration

Invitation tokens are hashed before being stored in PostgreSQL.

For development/testing, the raw invitation token is currently returned by the API. A production email delivery flow can be integrated later.

---

# Organization Settings

Frontend:

```text
client/src/pages/organization/OrganizationSettingsPage.jsx
```

APIs:

```text
GET /api/organization/settings
PUT /api/organization/settings
```

Current functionality:

* View organization information
* View organization status
* View organization creation date
* Update organization name

---

# Organization Admin Profile

Frontend:

```text
client/src/pages/organization/OrganizationProfilePage.jsx
```

APIs:

```text
GET /api/organization/profile
PUT /api/organization/profile
```

Current information:

* Name
* Email
* Role
* Account status

The email address is currently read-only from the profile page.

---

# Employee Dashboard

The Employee Dashboard provides CRM functionality for authenticated employee users.

The employee dashboard is connected to the backend and PostgreSQL database through REST APIs.

Employee dashboard modules include:

* Dashboard
* Leads
* Customers
* Deals
* Tasks
* Activities
* Notes
* Notifications
* Profile

The employee dashboard uses the authenticated user's ID and organization ID to retrieve and manage employee-specific CRM data.

---

# Employee Dashboard Flow

The employee flow is based on authentication and role-based access.

```text
Application
    |
    v
Login Page
    |
    v
Enter Employee Credentials
    |
    v
POST /api/auth/login
    |
    v
Credentials Validation
    |
    v
JWT Token Generated
    |
    v
Employee Role Identified
    |
    v
Employee Dashboard
    |
    +-----------------------------+
    |                             |
    v                             v
Employee Dashboard Data       Employee CRM Modules
    |                             |
    v                             v
PostgreSQL                    REST APIs
```

The authenticated employee can access only employee-protected APIs.

Employee requests are protected using:

```text
Authentication Middleware
        +
Employee Role Authorization
```

---

# Employee Dashboard Analytics

Employee dashboard data is retrieved from:

```text
GET /api/employee/dashboard
```

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

Dashboard statistics are calculated using the authenticated employee's organization ID and user ID.

This ensures that dashboard metrics are based on the employee's assigned CRM records.

---

# Employee Leads

Employee lead management is connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET    /api/employee/leads
GET    /api/employee/leads/:id
POST   /api/employee/leads
PUT    /api/employee/leads/:id
DELETE /api/employee/leads/:id
```

Current functionality:

* View leads
* View individual lead
* Create leads
* Update leads
* Delete leads
* Search/filter leads through frontend functionality
* Store lead information in PostgreSQL
* Associate leads with the authenticated employee

Lead information includes:

* Name
* Company
* Email
* Phone
* Status
* Source
* Value

Supported lead statuses:

```text
New
Contacted
Qualified
Unqualified
Converted
```

---

# Employee Customers

Customer management is connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET    /api/employee/customers
GET    /api/employee/customers/:id
POST   /api/employee/customers
PUT    /api/employee/customers/:id
DELETE /api/employee/customers/:id
```

Current functionality:

* View customers
* View individual customer
* Create customers
* Update customers
* Delete customers
* Store customer information in PostgreSQL
* Associate customers with the authenticated employee

Customer information includes:

* Name
* Company
* Email
* Phone
* Status
* Industry
* Total spend
* Customer since

---

# Employee Deals

Deal management is connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET    /api/employee/deals
GET    /api/employee/deals/:id
POST   /api/employee/deals
PUT    /api/employee/deals/:id
DELETE /api/employee/deals/:id
```

Current functionality:

* View deals
* View individual deal
* Create deals
* Update deals
* Delete deals
* Track deal stages
* Track deal values
* Associate deals with customers
* Store deal information in PostgreSQL

Supported deal stages:

```text
New
Qualified
Proposal
Negotiation
Won
Lost
```

---

# Employee Tasks

Task management is connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET    /api/employee/tasks
GET    /api/employee/tasks/:id
POST   /api/employee/tasks
PUT    /api/employee/tasks/:id
DELETE /api/employee/tasks/:id
```

Current functionality:

* View tasks
* View individual task
* Create tasks
* Update tasks
* Delete tasks
* Track task status
* Track task priority
* Track due dates
* Associate tasks with CRM records

Supported task statuses:

```text
Pending
In Progress
Completed
```

Supported priorities:

```text
Low
Medium
High
```

---

# Employee Activities

Activity management is connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET    /api/employee/activities
POST   /api/employee/activities
PUT    /api/employee/activities/:id
DELETE /api/employee/activities/:id
```

Current functionality:

* View activities
* Create activities
* Update activities
* Delete activities
* Associate activities with CRM records
* Track activity type
* Track activity date/time

Supported activity types include:

```text
Call
Email
Meeting
Lead Update
Customer Update
Deal Update
```

---

# Employee Notes

Note management is connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET    /api/employee/notes
POST   /api/employee/notes
PUT    /api/employee/notes/:id
DELETE /api/employee/notes/:id
```

Current functionality:

* View notes
* Create notes
* Update notes
* Delete notes
* Associate notes with leads, customers, or deals
* Store note content in PostgreSQL

Supported related record types:

```text
Lead
Customer
Deal
```

---

# Employee Notifications

Employee notifications are connected to PostgreSQL through backend REST APIs.

APIs:

```text
GET /api/employee/notifications
PUT /api/employee/notifications/:id/read
PUT /api/employee/notifications/read-all
```

Current functionality:

* Retrieve notifications for the authenticated employee
* Track notification type
* Display notification title and description
* Track read/unread status
* Mark individual notifications as read
* Mark all notifications as read

Supported notification types:

```text
lead
task
deal
customer
```

---

# Employee Profile

Employee profile information is retrieved and updated through backend REST APIs.

APIs:

```text
GET /api/employee/profile
PUT /api/employee/profile
```

Current profile information includes:

* Name
* Email
* Role
* Account status
* Phone
* Department
* Location
* Organization
* Account creation date
* Last login information

The employee email address is retrieved from the authenticated user account.

Profile updates are stored in PostgreSQL.

---

# Employee Backend Architecture

Employee backend functionality is organized into routes, controllers, and services.

Employee route:

```text
server/routes/employeeRoutes.js
```

Employee controller:

```text
server/controllers/employeeController.js
```

Employee service:

```text
server/services/employeeService.js
```

CRM controllers include:

```text
server/controllers/leadController.js
server/controllers/customerController.js
server/controllers/dealController.js
server/controllers/taskController.js
server/controllers/activityController.js
server/controllers/noteController.js
server/controllers/notificationController.js
```

CRM services include:

```text
server/services/leadService.js
server/services/customerService.js
server/services/dealService.js
server/services/taskService.js
server/services/activityService.js
server/services/noteService.js
server/services/notificationService.js
```

---

# Employee API Protection

All employee routes are protected by authentication and employee role authorization.

The employee route configuration uses:

```text
Authentication Middleware
+
Employee Role Middleware
```

General flow:

```text
Employee Request
      |
      v
JWT Validation
      |
      v
Employee Role Validation
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
Response
```

Employee CRM records are filtered using:

```text
organization_id
owner_id / user_id
```

This ensures that employee data is associated with the correct organization and authenticated employee.

---

# API Overview

## Authentication

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

## Organization

```text
GET /api/organization/dashboard

GET  /api/organization/employees

GET  /api/organization/invitations
POST /api/organization/invitations

GET  /api/organization/settings
PUT  /api/organization/settings

GET  /api/organization/profile
PUT  /api/organization/profile
```

## Employee Dashboard

```text
GET /api/employee/dashboard
```

## Employee Profile

```text
GET /api/employee/profile
PUT /api/employee/profile
```

## Employee Leads

```text
GET    /api/employee/leads
GET    /api/employee/leads/:id
POST   /api/employee/leads
PUT    /api/employee/leads/:id
DELETE /api/employee/leads/:id
```

## Employee Customers

```text
GET    /api/employee/customers
GET    /api/employee/customers/:id
POST   /api/employee/customers
PUT    /api/employee/customers/:id
DELETE /api/employee/customers/:id
```

## Employee Deals

```text
GET    /api/employee/deals
GET    /api/employee/deals/:id
POST   /api/employee/deals
PUT    /api/employee/deals/:id
DELETE /api/employee/deals/:id
```

## Employee Tasks

```text
GET    /api/employee/tasks
GET    /api/employee/tasks/:id
POST   /api/employee/tasks
PUT    /api/employee/tasks/:id
DELETE /api/employee/tasks/:id
```

## Employee Activities

```text
GET    /api/employee/activities
POST   /api/employee/activities
PUT    /api/employee/activities/:id
DELETE /api/employee/activities/:id
```

## Employee Notes

```text
GET    /api/employee/notes
POST   /api/employee/notes
PUT    /api/employee/notes/:id
DELETE /api/employee/notes/:id
```

## Employee Notifications

```text
GET /api/employee/notifications
PUT /api/employee/notifications/:id/read
PUT /api/employee/notifications/read-all
```

---

# API Request Flow

## Organization Admin

```text
React Component
      |
      v
Organization Service
      |
      v
Axios
      |
      v
Authorization: Bearer <JWT>
      |
      v
Express Route
      |
      v
Authentication Middleware
      |
      v
Organization Admin Authorization
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
Response
      |
      v
React UI
```

## Employee

```text
React Component
      |
      v
Employee Service
      |
      v
Axios
      |
      v
Authorization: Bearer <JWT>
      |
      v
Express Employee Route
      |
      v
Authentication Middleware
      |
      v
Employee Role Authorization
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
Response
      |
      v
React UI
```

The separation between routes, controllers, and services keeps API handling and business/database logic organized.

---

# Health Check

Endpoint:

```text
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "CRM API is running"
}
```

---

# Running the Application

Start PostgreSQL first.

Then run the backend:

```bash
cd server
npm install
npm run dev
```

In another terminal, run the frontend:

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# Application Testing Flow

## Organization Admin Flow

```text
Open Application
      |
      v
Login Page
      |
      v
Organization Admin Login
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

## Employee Flow

```text
Open Application
      |
      v
Login Page
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

# Current Development Status

## Organization Admin

* [x] Authentication
* [x] JWT-based protected routes
* [x] Organization layout
* [x] Organization sidebar
* [x] Organization dashboard
* [x] Employee listing
* [x] Employee search
* [x] Employee invitations
* [x] Invitation persistence
* [x] Organization settings
* [x] Organization profile
* [x] Logout

## Employee Module

* [x] Employee dashboard frontend
* [x] Employee dashboard backend integration
* [x] Employee dashboard PostgreSQL integration
* [x] Employee role-based protected routes
* [x] Employee dashboard metrics
* [x] Leads backend integration
* [x] Customers backend integration
* [x] Deals backend integration
* [x] Tasks backend integration
* [x] Activities backend integration
* [x] Notes backend integration
* [x] Notifications backend integration
* [x] Employee profile backend integration
* [x] Employee-specific data filtering
* [x] Organization-level data isolation

Employee dashboard functionality is integrated through REST APIs and PostgreSQL.

---

# Development Notes

* PostgreSQL is used as the development database.
* Authentication is handled using JWT.
* Passwords are stored using bcrypt hashing.
* Organization-level data is scoped using the authenticated user's organization ID.
* Employee CRM data is scoped using organization ID and employee/user ownership.
* Employee routes are protected using authentication and role-based authorization.
* Invitation tokens are currently generated for development/testing purposes.
* Email delivery for invitations can be integrated later.
* The application uses a layered route, controller, and service architecture.
* Employee dashboard statistics are calculated from PostgreSQL data.
* Employee dashboard modules use REST APIs for frontend-backend communication.

---

# Contributions

This project is being developed collaboratively.

## Venu

Current implementation includes:

* Authentication and JWT integration
* PostgreSQL database connectivity
* Organization Admin portal
* Organization dashboard
* Employee management
* Employee invitations
* Organization settings
* Organization profile
* Protected organization routes

## Gowri

Employee Dashboard implementation and backend integration includes:

* Employee dashboard frontend integration
* Employee dashboard backend integration
* PostgreSQL integration for employee CRM data
* Employee role-based authentication and authorization
* Employee dashboard analytics
* Lead management
* Customer management
* Deal management
* Task management
* Activity management
* Notes management
* Notifications management
* Employee profile management
* Employee-specific data filtering
* Organization-level data isolation
* Employee REST API integration
* Employee route, controller, and service integration

---

# Future Enhancements

Potential future modules and improvements include:

* Employee invitation acceptance flow
* Email-based invitation delivery
* Employee management actions
* Password management
* Organization analytics
* Audit/activity tracking
* Advanced search and filters
* Advanced CRM reporting
* Email notifications
* Production deployment improvements
* Additional security hardening

---

# License

This project is currently intended for learning purposes.
