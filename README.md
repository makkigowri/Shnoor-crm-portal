# CRM SaaS Portal

A web-based CRM SaaS platform designed to help organizations manage employees and CRM operations through separate organization-admin and employee interfaces.

The application follows a client-server architecture with a React frontend, Node.js/Express backend, and PostgreSQL database.

---

## Project Overview

The CRM platform provides separate functionality for:

- Organization Administrators
- Employees / CRM Users

Organization administrators can manage their organization and employees, while employees can work with CRM-related operations such as leads, customers, deals, tasks, activities, and notifications.

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

### Database
- PostgreSQL

### Development Tools
- Git
- GitHub
- Postman
- Nodemon

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
```

---

# Prerequisites

Install:

- Node.js
- npm
- PostgreSQL
- Git

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
DB_USER= DB_USER
DB_PASSWORD= DB_PASSWORD
JWT_SECRET="JWT_SECRET"
JWT_EXPIRES_IN="Time"
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

Current core entities:

```text
organizations
users
invitations
```

### Organizations

Stores:

- Organization ID
- Organization name
- Organization status
- Creation/update timestamps

### Users

Stores organization administrators and employees.

Important attributes include:

- User ID
- Organization ID
- Name
- Email
- Password hash
- Role
- Status
- Login information

Supported roles:

```text
ORG_ADMIN
SALES_MANAGER
SALES_EXECUTIVE
SUPPORT_AGENT
```

### Invitations

Stores employee invitation information including:

- Organization
- Employee email
- Assigned role
- Invitation token
- Expiration
- Status
- Inviting administrator

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
Controllers
      |
      v
Services
      |
      v
PostgreSQL
```

Frontend responsibilities:

- UI
- Routing
- Authentication state
- API communication
- Page-level functionality

Backend responsibilities:

- API endpoints
- Authentication
- Authorization
- Business logic
- Database operations

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
JWT Generation
  |
  v
Token Stored on Client
  |
  v
Protected Routes
  |
  v
Authenticated API Requests
```

Protected requests use:

```text
Authorization: Bearer <token>
```

The backend authentication middleware validates the token and makes authenticated user information available to protected requests.

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

- Dashboard
- Employees
- Invitations
- Organization Settings
- Profile
- Logout

---

# Organization Dashboard

Frontend:

```text
client/src/pages/organization/OrganizationDashboard.jsx
```

Current dashboard information:

- Total Employees
- Active Employees
- Inactive Employees
- Pending Invitations

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

- View employees
- Search employees
- View employee roles
- View employee status

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

- Create employee invitations
- Select employee roles
- View invitations
- Track invitation status
- Track invitation expiration

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

- View organization information
- View organization status
- View organization creation date
- Update organization name

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

- Name
- Email
- Role
- Account status

The email address is currently read-only from the profile page.

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

GET /api/organization/employees

GET  /api/organization/invitations
POST /api/organization/invitations

GET /api/organization/settings
PUT /api/organization/settings

GET /api/organization/profile
PUT /api/organization/profile
```

Organization APIs require authentication.

---

# API Request Flow

```text
React Component
      |
      v
organizationService.js
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
npm run dev
```

In another terminal, run the frontend:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Current Development Status

## Organization Admin

- [x] Authentication
- [x] JWT-based protected routes
- [x] Organization layout
- [x] Organization sidebar
- [x] Organization dashboard
- [x] Employee listing
- [x] Employee search
- [x] Employee invitations
- [x] Invitation persistence
- [x] Organization settings
- [x] Organization profile
- [x] Logout

## Employee Module

The employee-side CRM functionality is being developed separately.

Additional employee-side implementation details will be documented here as development progresses.

---

# Development Notes

- PostgreSQL is currently used as the development database.
- Authentication is handled using JWT.
- Organization-level data is scoped using the authenticated user's organization ID.
- Invitation tokens are currently generated for development/testing purposes.
- Email delivery for invitations can be integrated later.
- Additional CRM modules will be documented as they are implemented.

---

# Contributions

This project is being developed collaboratively.

## Venu

Current implementation includes:

- Authentication and JWT integration
- PostgreSQL database connectivity
- Organization Admin portal
- Organization dashboard
- Employee management
- Employee invitations
- Organization settings
- Organization profile
- Protected organization routes

## Gowri

Additional implementation details will be appended here.

---

# Future Enhancements

Potential future modules and improvements include:

- Employee invitation acceptance flow
- Email-based invitation delivery
- Employee management actions
- Password management
- Lead management
- Customer management
- Deal management
- Task management
- Activity management
- Notifications
- Organization analytics
- Audit/activity tracking

---

# License

This project is currently intended for learning purposes.
