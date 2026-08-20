const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const registerOrganization = async ({
  organizationName,
  adminName,
  email,
  password,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Check whether the email is already registered
    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      const error = new Error("Email is already registered");
      error.statusCode = 409;
      throw error;
    }

    // Hash password before storing it
    const passwordHash = await bcrypt.hash(password, 12);

    // Create organization
    const organizationResult = await client.query(
      `
      INSERT INTO organizations (name)
      VALUES ($1)
      RETURNING id, name, status, created_at
      `,
      [organizationName]
    );

    const organization = organizationResult.rows[0];

    // Create organization admin
    const userResult = await client.query(
      `
      INSERT INTO users (
        organization_id,
        name,
        email,
        password_hash,
        role,
        status
      )
      VALUES ($1, $2, $3, $4, 'ORG_ADMIN', 'ACTIVE')
      RETURNING id, organization_id, name, email, role, status, created_at
      `,
      [
        organization.id,
        adminName,
        email,
        passwordHash,
      ]
    );

    const user = userResult.rows[0];

    // Commit both operations
    await client.query("COMMIT");

    return {
      organization,
      user,
    };
  } catch (error) {
    // Roll back organization creation if anything fails
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};


const loginUser = async ({ email, password }) => {
  // Find user by email
  const result = await pool.query(
    `
    SELECT
      id,
      organization_id,
      name,
      email,
      password_hash,
      role,
      status
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  // Don't reveal whether the email exists
  if (result.rows.length === 0) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const user = result.rows[0];

  // Check account status
  if (user.status !== "ACTIVE") {
    const error = new Error("User account is not active");
    error.statusCode = 403;
    throw error;
  }

  // Compare entered password with stored bcrypt hash
  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      organizationId: user.organization_id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  // Update last login timestamp
  await pool.query(
    `
    UPDATE users
    SET last_login_at = CURRENT_TIMESTAMP
    WHERE id = $1
    `,
    [user.id]
  );

  // Never return password_hash
  return {
    token,
    user: {
      id: user.id,
      organizationId: user.organization_id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
};


module.exports = {
  registerOrganization,
  loginUser,
};