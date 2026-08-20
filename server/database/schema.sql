-- ============================================================
-- CRM SaaS - Initial Database Schema
-- PostgreSQL
--
-- Tables:
-- 1. organizations
-- 2. users
-- 3. invitations
-- ============================================================


-- ============================================================
-- 1. ORGANIZATIONS
-- ============================================================

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


-- ============================================================
-- 2. USERS
-- ============================================================

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


-- ============================================================
-- 3. INVITATIONS
-- ============================================================

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


-- ============================================================
-- INDEXES
-- ============================================================

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