**# CRM SaaS Portal — Backend Documentation**

This document covers the backend implementation, local setup, database configuration, API structure, authentication, authorization, completed work, partially completed work, known considerations, and recommended next steps for the CRM SaaS Portal.

\> The frontend documentation is maintained separately. This document focuses on the Node.js/Express backend, PostgreSQL database, REST APIs, authentication/authorization, and backend work integrated into the current branch.

\---

**# 1. Backend Overview**

The CRM backend is a REST API built with:

\- Node.js

\- Express.js

\- PostgreSQL

\- \`pg\`

\- JWT

\- \`bcryptjs\`

\- CORS

\- Nodemon

The backend follows a layered structure:

\`\`\`text

HTTP Request

     |

     v

Route

     |

     v

Authentication / Authorization Middleware

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

JSON Response

\`\`\`

The backend currently supports two major application areas:

1\. Organization Administration

2\. Employee CRM

The Employee CRM implementation includes modules for:

\- Dashboard

\- Leads

\- Customers

\- Deals

\- Tasks

\- Activities

\- Notes

\- Notifications

\- Employee Profile

The Organization Admin implementation includes:

\- Organization Dashboard

\- Employees

\- Invitations

\- Organization Settings

\- Organization Profile

\---

**# 2. Backend Technology Stack**

\| Technology | Purpose |

\|---|---|

\| Node.js | JavaScript runtime |

\| Express.js | REST API framework |

\| PostgreSQL | Relational database |

\| \`pg\` | PostgreSQL client |

\| JWT | Authentication |

\| bcryptjs | Password hashing |

\| CORS | Frontend/backend communication |

\| dotenv | Environment configuration |

\| Nodemon | Development server restart |

\---

**# 3. Backend Directory Structure**

Current backend structure:

\`\`\`text

server/

├── config/

│   └── db.js

│

├── controllers/

│   ├── activityController.js

│   ├── authController.js

│   ├── customerController.js

│   ├── dealController.js

│   ├── employeeController.js

│   ├── leadController.js

│   ├── noteController.js

│   ├── notificationController.js

│   ├── organizationController.js

│   └── taskController.js

│

├── database/

│   ├── initDb.js

│   └── schema.sql

│

├── middleware/

│   ├── authMiddleware.js

│   └── roleMiddleware.js

│

├── routes/

│   ├── authRoutes.js

│   ├── employeeRoutes.js

│   └── organizationRoutes.js

│

├── services/

│   ├── activityService.js

│   ├── authService.js

│   ├── customerService.js

│   ├── dealService.js

│   ├── employeeService.js

│   ├── leadService.js

│   ├── noteService.js

│   ├── notificationService.js

│   ├── organizationService.js

│   └── taskService.js

│

├── app.js

├── server.js

├── package.json

└── .env

\`\`\`

\---

**# 4. Prerequisites**

Install:

\- Node.js

\- npm

\- PostgreSQL

\- Git

\- Postman or another API testing tool

Verify:

\`\`\`bash

node --version

npm --version

psql --version

git --version

\`\`\`

\---

**# 5. Backend Installation**

From the project root:

\`\`\`bash

cd server

npm install

\`\`\`

Development server:

\`\`\`bash

npm run dev

\`\`\`

Production-style start:

\`\`\`bash

npm start

\`\`\`

The backend normally runs on:

\`\`\`text

http\://localhost:5000

\`\`\`

\---

**# 6. Environment Configuration**

Create:

\`\`\`text

server/.env

\`\`\`

Example development configuration:

\`\`\`env

PORT=5000

DB\_HOST=localhost

DB\_PORT=5432

DB\_NAME=crm

DB\_USER=postgres

DB\_PASSWORD=YOUR\_POSTGRES\_PASSWORD

JWT\_SECRET=YOUR\_LONG\_RANDOM\_SECRET

JWT\_EXPIRES\_IN=1d

\`\`\`

Use the actual database name, username, password, and JWT secret configured on the developer's machine.

**## Important**

Do **\*\*not\*\*** commit the real \`.env\` file or real secrets to GitHub.

The following values must be available for the backend to start correctly:

\- \`PORT\`

\- PostgreSQL host

\- PostgreSQL port

\- PostgreSQL database

\- PostgreSQL user

\- PostgreSQL password

\- JWT secret

\- JWT expiration configuration

If a developer receives the repository fresh, they need to create their own \`server/.env\`.

\---

**# 7. PostgreSQL Setup**

The backend uses PostgreSQL.

The schema is maintained in:

\`\`\`text

server/database/schema.sql

\`\`\`

Database initialization is handled by:

\`\`\`text

server/database/initDb.js

\`\`\`

The server startup sequence performs a database connection check and initializes the schema before starting Express.

Typical startup flow:

\`\`\`text

server.js

   |

   +--> load .env

   |

   +--> connect to PostgreSQL

   |

   +--> initialize database schema

   |

   +--> start Express server

\`\`\`

The database connection is configured through:

\`\`\`text

server/config/db.js

\`\`\`

\---

**# 8. Database Schema Overview**

The current database contains organization, authentication, invitation, and CRM-related entities.

Core entities include:

\`\`\`text

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

\`\`\`

The exact schema and constraints should always be treated as defined by:

\`\`\`text

server/database/schema.sql

\`\`\`

Do not manually recreate individual tables if the schema file can be used to initialize the database.

\---

**# 9. Important Database Relationships**

The high-level relationship is:

\`\`\`text

Organization

     |

     +-------------------+

     |                   |

     v                   v

   Users            Invitations

     |

     +-----------------------------------+

     |       |       |       |           |

     v       v       v       v           v

   Leads  Customers Deals  Tasks   Other CRM records

\`\`\`

Users belong to an organization.

Organization administrators have:

\`\`\`text

role = ORG\_ADMIN

\`\`\`

Supported employee roles include:

\`\`\`text

SALES\_MANAGER

SALES\_EXECUTIVE

SUPPORT\_AGENT

\`\`\`

Employee records should be scoped to the appropriate organization and authenticated user wherever applicable.

\---

**# 10. Authentication**

Authentication uses JWT.

The general flow is:

\`\`\`text

Login Request

     |

     v

POST /api/auth/login

     |

     v

Validate user credentials

     |

     v

Compare password using bcryptjs

     |

     v

Generate JWT

     |

     v

Return token + user information

\`\`\`

The JWT contains information required to identify the authenticated user, including:

\`\`\`text

userId

organizationId

role

\`\`\`

Example decoded payload:

\`\`\`json

{

  "userId": "1",

  "organizationId": "1",

  "role": "ORG\_ADMIN"

}

\`\`\`

Protected API requests use:

\`\`\`http

Authorization: Bearer \<JWT>

\`\`\`

\---

**# 11. Authentication Middleware**

File:

\`\`\`text

server/middleware/authMiddleware.js

\`\`\`

Responsibilities:

1\. Read the \`Authorization\` header.

2\. Verify the \`Bearer\` format.

3\. Extract the JWT.

4\. Verify the JWT using \`JWT\_SECRET\`.

5\. Attach the decoded user to:

\`\`\`js

req.user

\`\`\`

If authentication fails, the backend returns:

\`\`\`http

401 Unauthorized

\`\`\`

Typical errors include:

\`\`\`text

Authentication required

Invalid or expired token

\`\`\`

\---

**# 12. Role-Based Authorization**

File:

\`\`\`text

server/middleware/roleMiddleware.js

\`\`\`

Role authorization is separate from authentication.

Authentication answers:

\> Is this request from a valid logged-in user?

Authorization answers:

\> Is this user allowed to perform this operation?

The application uses roles such as:

\`\`\`text

ORG\_ADMIN

SALES\_MANAGER

SALES\_EXECUTIVE

SUPPORT\_AGENT

\`\`\`

Organization administration APIs should only be accessible to users with the appropriate organization-admin permissions.

\---

**# 13. Authentication API**

The authentication routes are defined in:

\`\`\`text

server/routes/authRoutes.js

\`\`\`

The authentication controller is:

\`\`\`text

server/controllers/authController.js

\`\`\`

The authentication service is:

\`\`\`text

server/services/authService.js

\`\`\`

The authentication implementation covers the basic account/login flow and JWT generation.

Before changing authentication behavior, check all three layers:

\`\`\`text

authRoutes.js

      |

      v

authController.js

      |

      v

authService.js

\`\`\`

\---

**# 14. Organization Admin APIs**

Organization routes:

\`\`\`text

server/routes/organizationRoutes.js

\`\`\`

Organization controller:

\`\`\`text

server/controllers/organizationController.js

\`\`\`

Organization service:

\`\`\`text

server/services/organizationService.js

\`\`\`

Current organization API areas include:

\`\`\`text

/api/organization/dashboard

/api/organization/employees

/api/organization/invitations

\`\`\`

The organization frontend also contains pages for:

\`\`\`text

/organization/settings

/organization/profile

\`\`\`

Their API implementation should be checked before extending these areas.

\---

**# 15. Organization Dashboard**

Endpoint:

\`\`\`http

GET /api/organization/dashboard

\`\`\`

Authentication:

\`\`\`text

Required

\`\`\`

The dashboard service calculates organization-level information such as:

\- Total employees

\- Active employees

\- Inactive employees

\- Pending invitations

Employee counts exclude:

\`\`\`text

ORG\_ADMIN

\`\`\`

Pending invitations are counted only when:

\`\`\`text

status = PENDING

\`\`\`

and the invitation has not expired.

The controller obtains the organization from:

\`\`\`js

req.user.organizationId

\`\`\`

This prevents an administrator from requesting dashboard information for an arbitrary organization.

\---

**# 16. Organization Employees**

Endpoint:

\`\`\`http

GET /api/organization/employees

\`\`\`

The service retrieves employees belonging to the authenticated organization.

Organization administrators are excluded from the employee listing.

Returned information includes fields such as:

\`\`\`text

id

name

email

role

status

created\_at

\`\`\`

\---

**# 17. Employee Invitations**

Endpoints:

\`\`\`http

GET  /api/organization/invitations

POST /api/organization/invitations

\`\`\`

Invitation creation currently performs checks for:

\- Valid employee role

\- Existing employee email

\- Existing pending invitation

\- Invitation expiration

\- Invitation token generation

Supported invitation roles:

\`\`\`text

SALES\_MANAGER

SALES\_EXECUTIVE

SUPPORT\_AGENT

\`\`\`

A cryptographically random token is generated.

The backend stores a SHA-256 hash of the token rather than the raw token.

For development/testing, the current API response can include the raw invitation token.

\---

**# 18. Invitation Acceptance — Current Status**

The invitation acceptance flow is **\*\*currently functional\*\***.

The current development flow is:

\`\`\`text

Organization Admin

       |

       v

Create Employee Invitation

       |

       v

Invitation is created

       |

       v

Invitation URL/token is displayed

       |

       v

Admin copies the invitation URL

       |

       v

Invited user opens the URL

       |

       v

Accept Invitation page

       |

       v

User creates an account

       |

       v

Employee account is created/activated

       |

       v

Employee can log in

\`\`\`

The frontend invitation acceptance page is:

\`\`\`text

client/src/pages/AcceptInvitationPage.jsx

\`\`\`

The invitation token is currently generated by the backend and the invitation URL/token can be displayed to the organization administrator for development/testing.

**### Current functionality**

\- [x] Create invitation

\- [x] Generate secure invitation token

\- [x] Store token hash

\- [x] Store invitation expiration

\- [x] Store invitation status

\- [x] Display/copy invitation URL for development

\- [x] Open invitation acceptance page

\- [x] Create invited employee account

\- [x] Activate the employee account

\- [x] Allow the created employee to log in

**### Production improvements still required**

\- [ ] Send invitation URL through email instead of relying on manual copying

\- [ ] Avoid exposing the raw invitation token in normal production API responses

\- [ ] Verify expired invitation handling

\- [ ] Verify invalid-token handling

\- [ ] Prevent reuse of accepted invitations

\- [ ] Handle cancelled invitations

\- [ ] Add resend-invitation functionality if required

The existing working flow should be preserved while these production improvements are added.

\---

**# 19. Employee CRM Backend**

The current backend contains separate controllers and services for the main CRM modules.

Controllers:

\`\`\`text

server/controllers/

├── employeeController.js

├── leadController.js

├── customerController.js

├── dealController.js

├── taskController.js

├── activityController.js

├── noteController.js

└── notificationController.js

\`\`\`

Services:

\`\`\`text

server/services/

├── employeeService.js

├── leadService.js

├── customerService.js

├── dealService.js

├── taskService.js

├── activityService.js

├── noteService.js

└── notificationService.js

\`\`\`

The routes are primarily exposed through:

\`\`\`text

server/routes/employeeRoutes.js

\`\`\`

\---

**# 20. Employee Dashboard API**

The employee dashboard is backed by:

\`\`\`text

GET /api/employee/dashboard

\`\`\`

The dashboard is intended to provide CRM summary information such as:

\- Total leads

\- New leads

\- Total customers

\- Active deals

\- Pending tasks

\- Won deals

\- Revenue

\- Leads by source

\- Deals by stage

\- Revenue trend

\- Upcoming tasks

\- Recent activities

The exact response shape should be checked in:

\`\`\`text

server/controllers/employeeController.js

server/services/employeeService.js

\`\`\`

before making frontend changes.

\---

**# 21. Leads API**

Current API structure:

\`\`\`http

GET    /api/employee/leads

GET    /api/employee/leads/\:id

POST   /api/employee/leads

PUT    /api/employee/leads/\:id

DELETE /api/employee/leads/\:id

\`\`\`

Lead operations include:

\- Listing leads

\- Viewing an individual lead

\- Creating leads

\- Updating leads

\- Deleting leads

\- Searching/filtering through the frontend

\- Persisting lead information in PostgreSQL

\---

**# 22. Customers API**

Current API structure:

\`\`\`http

GET    /api/employee/customers

GET    /api/employee/customers/\:id

POST   /api/employee/customers

PUT    /api/employee/customers/\:id

DELETE /api/employee/customers/\:id

\`\`\`

Customer operations include:

\- Listing customers

\- Creating customers

\- Updating customers

\- Deleting customers

\- Searching/filtering through the frontend

\- PostgreSQL persistence

\---

**# 23. Deals API**

Current API structure:

\`\`\`http

GET    /api/employee/deals

GET    /api/employee/deals/\:id

POST   /api/employee/deals

PUT    /api/employee/deals/\:id

DELETE /api/employee/deals/\:id

\`\`\`

Deals support sales-pipeline operations.

Frontend stages currently include:

\`\`\`text

New

Qualified

Proposal

Negotiation

Won

Lost

\`\`\`

\---

**# 24. Tasks API**

Current API structure:

\`\`\`http

GET    /api/employee/tasks

GET    /api/employee/tasks/\:id

POST   /api/employee/tasks

PUT    /api/employee/tasks/\:id

DELETE /api/employee/tasks/\:id

\`\`\`

Tasks support:

\- Creation

\- Retrieval

\- Updates

\- Deletion

\- Status

\- Priority

\- Due dates

\---

**# 25. Activities API**

Current API structure:

\`\`\`http

GET    /api/employee/activities

POST   /api/employee/activities

PUT    /api/employee/activities/\:id

DELETE /api/employee/activities/\:id

\`\`\`

Activities are intended to represent CRM actions and interactions associated with records and users.

\---

**# 26. Notes API**

Current API structure:

\`\`\`http

GET    /api/employee/notes

POST   /api/employee/notes

PUT    /api/employee/notes/\:id

DELETE /api/employee/notes/\:id

\`\`\`

Notes can be associated with CRM records such as:

\`\`\`text

Lead

Customer

Deal

\`\`\`

\---

**# 27. Notifications API**

Current API structure:

\`\`\`http

GET /api/employee/notifications

PUT /api/employee/notifications/\:id/read

PUT /api/employee/notifications/read-all

\`\`\`

Notifications support:

\- Listing notifications

\- Read/unread state

\- Marking one notification as read

\- Marking all notifications as read

\---

**# 28. Employee Profile API**

The employee profile API is documented as:

\`\`\`http

GET /api/employee/profile

PUT /api/employee/profile

\`\`\`

Profile data includes information such as:

\- Name

\- Email

\- Role

\- Account status

\- Phone

\- Department

\- Location

\- Organization

\- Account creation information

\- Last login information

\---

**# 29. Health Check**

The backend exposes:

\`\`\`http

GET /api/health

\`\`\`

Expected response:

\`\`\`json

{

  "success": true,

  "message": "CRM API is running"

}

\`\`\`

Use this endpoint to quickly determine whether Express is running.

\---

**# 30. API Request Pattern**

Protected requests should contain:

\`\`\`http

Authorization: Bearer \<JWT>

Content-Type: application/json

\`\`\`

Example:

\`\`\`http

GET http\://localhost:5000/api/organization/dashboard

Authorization: Bearer \<JWT>

\`\`\`

POST example:

\`\`\`http

POST http\://localhost:5000/api/organization/invitations

Authorization: Bearer \<JWT>

Content-Type: application/json

\`\`\`

Request body:

\`\`\`json

{

  "email": "employee\@example.com",

  "role": "SALES\_EXECUTIVE"

}

\`\`\`

\---

**# 31. Testing with Postman**

Postman can be used to test backend APIs independently of React.

Recommended testing sequence:

**### Step 1 — Health**

\`\`\`http

GET http\://localhost:5000/api/health

\`\`\`

**### Step 2 — Login**

\`\`\`http

POST http\://localhost:5000/api/auth/login

\`\`\`

Save the returned JWT.

**### Step 3 — Test authenticated API**

Add:

\`\`\`http

Authorization: Bearer \<JWT>

\`\`\`

Then test:

\`\`\`http

GET http\://localhost:5000/api/organization/dashboard

\`\`\`

**### Step 4 — Organization employees**

\`\`\`http

GET http\://localhost:5000/api/organization/employees

\`\`\`

**### Step 5 — Invitations**

\`\`\`http

GET http\://localhost:5000/api/organization/invitations

\`\`\`

Create an invitation:

\`\`\`http

POST http\://localhost:5000/api/organization/invitations

\`\`\`

Body:

\`\`\`json

{

  "email": "employee\@example.com",

  "role": "SALES\_EXECUTIVE"

}

\`\`\`

**### Step 6 — Invitation acceptance**

Use the invitation URL generated/displayed by the application.

Verify:

\`\`\`text

Invitation created

        ↓

Invitation URL copied

        ↓

Accept invitation

        ↓

Create employee account

        ↓

Employee becomes active

        ↓

Employee login

\`\`\`

**### Step 7 — Employee APIs**

After authentication, test the employee dashboard and CRM endpoints independently.

\---

**# 32. Common Authentication Issue**

If an API returns:

\`\`\`text

401 Unauthorized

\`\`\`

check the browser/Postman request headers.

The request must contain:

\`\`\`text

Authorization: Bearer \<actual-token>

\`\`\`

A request such as:

\`\`\`text

Authorization: Bearer null

\`\`\`

will fail.

Also verify:

\`\`\`text

JWT\_SECRET

\`\`\`

is identical between the process that creates the JWT and the process that verifies it.

\---

**# 33. Database and Authentication Dependency**

The backend depends on both:

\`\`\`text

PostgreSQL

\+

JWT\_SECRET

\`\`\`

If PostgreSQL is unavailable, database-backed endpoints will fail.

If \`JWT\_SECRET\` is missing or different, protected API requests will fail authentication.

When restarting development on a new machine, verify these before debugging frontend errors.

\---

**# 34. Current Work Completed**

The current integrated codebase includes the following backend areas.

**## Authentication**

\- [x] User authentication

\- [x] Password hashing using bcryptjs

\- [x] JWT generation

\- [x] JWT verification

\- [x] Authentication middleware

\- [x] Role information in authenticated user context

\- [x] Protected APIs

**## Organization Administration**

\- [x] Organization dashboard API

\- [x] Organization employee listing

\- [x] Employee invitation creation

\- [x] Invitation listing

\- [x] Pending invitation dashboard count

\- [x] Organization-scoped queries

\- [x] Role middleware

\- [x] Organization controller/service separation

\- [x] Invitation URL generation/display for development

\- [x] Invitation acceptance flow

\- [x] Invited employee account creation

\- [x] Employee activation after invitation acceptance

**## Employee CRM**

\- [x] Employee backend module

\- [x] Employee dashboard API

\- [x] Leads backend module

\- [x] Customers backend module

\- [x] Deals backend module

\- [x] Tasks backend module

\- [x] Activities backend module

\- [x] Notes backend module

\- [x] Notifications backend module

\- [x] Employee profile backend module

\- [x] Employee route/controller/service structure

\- [x] PostgreSQL integration

**## Infrastructure**

\- [x] Express application

\- [x] CORS

\- [x] JSON request parsing

\- [x] PostgreSQL connection pool

\- [x] Database initialization

\- [x] Environment configuration

\- [x] Nodemon development setup

\- [x] REST API structure

\---

**# 35. Partially Completed / Needs Further Work**

The following areas should be treated as continuation points rather than assumed to be production-complete.

**## 35.1 Invitation Email Delivery**

The invitation creation and acceptance workflow is functional for development.

Current process:

\`\`\`text

Create invitation

      ↓

Generate invitation URL/token

      ↓

Display/copy URL

      ↓

User opens URL

      ↓

Account creation

      ↓

Employee activation

\`\`\`

Remaining work:

\- Add an email provider/service.

\- Send the invitation URL through email.

\- Do not expose the raw invitation token in normal production API responses.

\- Add email delivery failure handling.

\- Add resend-invitation functionality if required.

\---

**## 35.2 Invitation Security and Lifecycle Hardening**

The basic acceptance flow works, but production-level handling should be verified.

Remaining areas:

\- Verify expired invitation handling.

\- Verify invalid-token handling.

\- Prevent reuse of accepted invitations.

\- Handle cancelled invitations.

\- Handle already-registered users appropriately.

\- Add clear expiration/error responses.

\- Consider rate limiting invitation acceptance attempts.

\---

**## 35.3 Organization Settings**

The organization settings page exists in the frontend.

Backend persistence for all settings should be verified against the current database schema before extending the page.

Potential future work:

\- Organization name update

\- Organization status management

\- Organization preferences

\- Security settings

\- Timezone/preferences if required

\- Validation and audit history

\---

**## 35.4 Organization Profile**

The organization profile UI exists, but the backend should be extended/verified for all profile fields that the final product requires.

Potential work:

\- GET organization profile

\- UPDATE organization profile

\- Validation

\- Organization-level authorization

\- Audit information

\---

**## 35.5 Password Management**

Potential future backend work:

\- Change password

\- Password reset

\- Password reset tokens

\- Expiring reset links

\- Password strength validation

\- Re-authentication for sensitive changes

\---

**## 35.6 Email Notifications**

Beyond invitations, the platform may eventually require:

\- New employee notifications

\- Task reminders

\- Deal notifications

\- Account notifications

\- Password reset emails

An email abstraction/service should be introduced rather than embedding provider-specific logic directly in controllers.

\---

**## 35.7 Audit Logging**

A future audit system could record:

\`\`\`text

Who performed the action

What action was performed

Which record was affected

When it happened

Organization

\`\`\`

This is especially useful for organization administrators.

\---

**## 35.8 API Validation**

The backend should eventually use centralized request validation for:

\- Email addresses

\- Passwords

\- IDs

\- Roles

\- Status values

\- Dates

\- Required fields

\- Request body structure

This will make the APIs more robust and reduce repeated validation logic.

\---

**## 35.9 Error Handling**

The backend currently handles errors at the controller level.

A future improvement would be a centralized Express error-handling middleware so that controllers can remain focused on business logic.

\---

**## 35.10 Production Security**

Before production deployment, review:

\- CORS configuration

\- JWT expiration

\- Secret management

\- Rate limiting

\- Request validation

\- Password policy

\- Error message exposure

\- Logging

\- HTTPS

\- Database credentials

\- Token handling

\- Authorization on every protected resource


---

**## 35.11 Organization Admin Notifications**

Organization-admin notifications are **not yet completed**.

The existing employee notification module should not be assumed to provide organization-admin notifications.

Remaining work:

- [ ] Organization admin notification UI
- [ ] Organization admin notification API integration
- [ ] Notifications for invitation acceptance
- [ ] Notifications for newly activated employees
- [ ] Notifications for important organization events
- [ ] Mark as read / unread functionality
- [ ] Notification persistence
- [ ] Notification count/badge in the admin interface

The employee notification APIs documented earlier are separate from the organization-admin notification requirement.

---

**## 35.12 Organization Admin Profile Picture / Topbar Avatar**

The organization admin profile functionality exists at a basic level, but the **admin profile picture in the topbar is not yet completed**.

Remaining work:

- [x] Organization admin profile page
- [ ] Profile picture upload
- [ ] Profile picture storage
- [ ] Profile picture retrieval
- [ ] Display admin profile picture in the organization topbar
- [ ] Display/update avatar in the sidebar where required
- [ ] Replace/remove profile picture
- [ ] Image type and file-size validation

Currently, the organization admin interface can display administrator information without a persisted profile image.

The topbar avatar should eventually use the authenticated organization's admin profile image rather than a static/default placeholder.


\---

**# 36. Data Isolation**

Organization-level data isolation is a critical requirement.

Queries should use the authenticated user's:

\`\`\`js

req.user.organizationId

\`\`\`

rather than accepting an arbitrary organization ID from the frontend.

Example:

\`\`\`text

Authenticated user

       |

       v

organizationId from JWT

       |

       v

Database query

       |

       v

Only records belonging to that organization

\`\`\`

When adding new CRM endpoints, always verify that records cannot be accessed across organizations.

For employee-specific records, also verify the intended employee ownership rules.

\---

**# 37. Development Workflow for New Backend Features**

For a new module, follow:

\`\`\`text

1\. Database table/schema

        ↓

2\. Service

        ↓

3\. Controller

        ↓

4\. Route

        ↓

5\. Authentication/authorization

        ↓

6\. Frontend service

        ↓

7\. Frontend page

        ↓

8\. Postman testing

        ↓

9\. End-to-end browser testing

\`\`\`

For every protected endpoint, verify:

\- Authentication

\- Role authorization

\- Organization scope

\- Record ownership

\- Input validation

\- Error handling

\---

**# 38. Recommended Restart Procedure**

When another developer resumes the project:

**### 1. Pull the latest code**

\`\`\`bash

git pull

\`\`\`

**### 2. Install dependencies**

\`\`\`bash

cd server

npm install

cd ../client

npm install

\`\`\`

**### 3. Create environment configuration**

Create:

\`\`\`text

server/.env

\`\`\`

with the required PostgreSQL and JWT values.

**### 4. Start PostgreSQL**

Make sure the configured PostgreSQL server is running.

**### 5. Start backend**

\`\`\`bash

cd server

npm run dev

\`\`\`

**### 6. Verify health**

Open:

\`\`\`text

http\://localhost:5000/api/health

\`\`\`

**### 7. Start frontend**

In another terminal:

\`\`\`bash

cd client

npm run dev

\`\`\`

**### 8. Test login**

Verify that the JWT is generated and authenticated API requests contain the token.

**### 9. Test the main modules**

Start with:

\`\`\`text

Authentication

Organization Dashboard

Employees

Invitations

Invitation Acceptance

Employee Dashboard

Leads

Customers

Deals

Tasks

Activities

Notes

Notifications

Profile

\`\`\`

\---

**# 39. Before Making Changes**

Before modifying an existing backend module:

1\. Check its route.

2\. Check its controller.

3\. Check its service.

4\. Check its database query/schema.

5\. Check the frontend service calling it.

6\. Check whether another module depends on it.

7\. Test the existing endpoint before changing it.

Avoid rewriting working modules without checking their current integration.

\---

**# 40. Git / Handover Notes**

The repository uses Git/GitHub for collaboration.

Before pushing:

\`\`\`bash

git status

git diff

\`\`\`

Review changes and then:

\`\`\`bash

git add .

git commit -m "Describe the change"

git push

\`\`\`

Do not commit:

\`\`\`text

.env

node\_modules/

database passwords

JWT secrets

API secrets

\`\`\`

When collaborating with another developer, pull the latest branch before starting work and verify the working tree is clean.

\---

**# 41. Recommended Future Development Order**

A practical order for continuing backend development is:

\`\`\`text

1\. Complete invitation email delivery

        ↓

2\. Harden invitation lifecycle/security

        ↓

3\. Complete organization profile/settings APIs

        ↓

4\. Add password management

        ↓

5\. Add centralized validation

        ↓

6\. Add centralized error handling

        ↓

7\. Add audit logging

        ↓

8\. Improve notification/email infrastructure

        ↓

9\. Security hardening

        ↓

10\. Production deployment

\`\`\`

The actual priority should be decided with the project lead based on product requirements.

\---

**# 42. Backend Completion Summary**

The backend has progressed from the initial authentication/database foundation into a broader CRM API supporting both organization administration and employee CRM operations.

The current architecture separates:

\`\`\`text

Routes

Controllers

Services

Middleware

Database

\`\`\`

The invitation workflow is currently functional through development/testing:

\`\`\`text

Invitation creation

      ↓

Invitation URL/token

      ↓

Manual URL copy

      ↓

Invitation acceptance

      ↓

Employee account creation

      ↓

Employee activation

      ↓

Employee login

\`\`\`

The main remaining work is primarily around production-ready workflows and hardening, especially:

\- Email delivery for invitations

\- Invitation lifecycle/security edge cases

\- Organization settings/profile persistence where required

\- Validation

\- Centralized error handling

\- Audit logging

\- Password management

\- Notification/email infrastructure

\- Production security

- Organization admin notifications
- Organization admin profile picture/avatar in the topbar


This document should be updated whenever a backend module is completed or its API contract changes.