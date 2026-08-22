CREATE TABLE IF NOT EXISTS organizations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT organizations_status_check
        CHECK (
            status IN (
                'ACTIVE',
                'SUSPENDED',
                'INACTIVE'
            )
        )
);
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'SALES_EXECUTIVE',
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT users_email_unique
        UNIQUE (email),
    CONSTRAINT users_role_check
        CHECK (
            role IN (
                'ORG_ADMIN',
                'SALES_MANAGER',
                'SALES_EXECUTIVE',
                'SUPPORT_AGENT'
            )
        ),
    CONSTRAINT users_status_check
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE',
                'SUSPENDED'
            )
        )
);
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE users ADD COLUMN IF NOT EXISTS department VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(150);
CREATE TABLE IF NOT EXISTS invitations (
    id BIGSERIAL PRIMARY KEY,

    organization_id BIGINT NOT NULL,

    email VARCHAR(255) NOT NULL,

    role VARCHAR(50) NOT NULL DEFAULT 'SALES_EXECUTIVE',

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    invited_by BIGINT NOT NULL,

    accepted_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT invitations_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    CONSTRAINT invitations_invited_by_fk
        FOREIGN KEY (invited_by)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT invitations_role_check
        CHECK (
            role IN (
                'SALES_MANAGER',
                'SALES_EXECUTIVE',
                'SUPPORT_AGENT'
            )
        ),

    CONSTRAINT invitations_status_check
        CHECK (
            status IN (
                'PENDING',
                'ACCEPTED',
                'EXPIRED',
                'CANCELLED'
            )
        )
);
CREATE INDEX IF NOT EXISTS idx_users_organization_id
    ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email);
CREATE INDEX IF NOT EXISTS idx_invitations_organization_id
    ON invitations(organization_id);
CREATE INDEX IF NOT EXISTS idx_invitations_email
    ON invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_status
    ON invitations(status);

CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'New',
    source VARCHAR(30),
    value NUMERIC(14,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT leads_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT leads_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT leads_status_check
        CHECK (
            status IN (
                'New',
                'Contacted',
                'Qualified',
                'Unqualified',
                'Converted'
            )
        ),
    CONSTRAINT leads_source_check
        CHECK (
            source IS NULL
            OR source IN (
                'Website',
                'Referral',
                'Cold Call',
                'Social Media',
                'Advertisement',
                'Event'
            )
        )
);
CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'Active',
    industry VARCHAR(100),
    total_spend NUMERIC(14,2) NOT NULL DEFAULT 0,
    customer_since DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT customers_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT customers_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT customers_status_check
        CHECK (
            status IN (
                'Active',
                'Inactive',
                'At Risk'
            )
        )
);
CREATE TABLE IF NOT EXISTS deals (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    customer_id BIGINT,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    stage VARCHAR(30) NOT NULL DEFAULT 'New',
    value NUMERIC(14,2) NOT NULL DEFAULT 0,
    close_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT deals_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT deals_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT deals_customer_fk
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE SET NULL,
    CONSTRAINT deals_stage_check
        CHECK (
            stage IN (
                'New',
                'Qualified',
                'Proposal',
                'Negotiation',
                'Won',
                'Lost'
            )
        )
);
CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    related_to VARCHAR(150),
    type VARCHAR(30) NOT NULL DEFAULT 'Lead',
    priority VARCHAR(30) NOT NULL DEFAULT 'Medium',
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    due_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tasks_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT tasks_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT tasks_type_check
        CHECK (
            type IN (
                'Lead',
                'Customer',
                'Deal'
            )
        ),
    CONSTRAINT tasks_priority_check
        CHECK (
            priority IN (
                'Low',
                'Medium',
                'High'
            )
        ),
    CONSTRAINT tasks_status_check
        CHECK (
            status IN (
                'Pending',
                'In Progress',
                'Completed'
            )
        )
);
CREATE TABLE IF NOT EXISTS activities (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    related_to VARCHAR(150),
    type VARCHAR(30) NOT NULL DEFAULT 'Call',
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT activities_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT activities_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT activities_type_check
        CHECK (
            type IN (
                'Call',
                'Email',
                'Meeting',
                'Lead Update',
                'Customer Update',
                'Deal Update'
            )
        )
);
CREATE TABLE IF NOT EXISTS notes (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    related_to VARCHAR(150) NOT NULL,
    related_type VARCHAR(30) NOT NULL DEFAULT 'Lead',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notes_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT notes_author_fk
        FOREIGN KEY (author_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT notes_related_type_check
        CHECK (
            related_type IN (
                'Lead',
                'Customer',
                'Deal'
            )
        )
);
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'lead',
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notifications_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT notifications_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT notifications_type_check
        CHECK (
            type IN (
                'lead',
                'task',
                'deal',
                'customer'
            )
        )
);
CREATE INDEX IF NOT EXISTS idx_leads_organization_id ON leads(organization_id);
CREATE INDEX IF NOT EXISTS idx_leads_owner_id ON leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_customers_organization_id ON customers(organization_id);
CREATE INDEX IF NOT EXISTS idx_customers_owner_id ON customers(owner_id);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_deals_organization_id ON deals(organization_id);
CREATE INDEX IF NOT EXISTS idx_deals_owner_id ON deals(owner_id);
CREATE INDEX IF NOT EXISTS idx_deals_customer_id ON deals(customer_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_tasks_organization_id ON tasks(organization_id);
CREATE INDEX IF NOT EXISTS idx_tasks_owner_id ON tasks(owner_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_activities_organization_id ON activities(organization_id);
CREATE INDEX IF NOT EXISTS idx_activities_owner_id ON activities(owner_id);
CREATE INDEX IF NOT EXISTS idx_activities_occurred_at ON activities(occurred_at);
CREATE INDEX IF NOT EXISTS idx_notes_organization_id ON notes(organization_id);
CREATE INDEX IF NOT EXISTS idx_notes_author_id ON notes(author_id);
CREATE INDEX IF NOT EXISTS idx_notifications_organization_id ON notifications(organization_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
