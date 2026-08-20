const pool = require("../config/db");

const getOrganizationDashboard = async (organizationId) => {
  // Total employees
  const totalEmployeesResult = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM users
    WHERE organization_id = $1
      AND role != 'ORG_ADMIN'
    `,
    [organizationId]
  );

  // Active employees
  const activeEmployeesResult = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM users
    WHERE organization_id = $1
      AND role != 'ORG_ADMIN'
      AND status = 'ACTIVE'
    `,
    [organizationId]
  );

  // Inactive employees
  const inactiveEmployeesResult = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM users
    WHERE organization_id = $1
      AND role != 'ORG_ADMIN'
      AND status = 'INACTIVE'
    `,
    [organizationId]
  );

  // Pending invitations
  const pendingInvitationsResult = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM invitations
    WHERE organization_id = $1
      AND status = 'PENDING'
    `,
    [organizationId]
  );

  return {
    totalEmployees: Number(totalEmployeesResult.rows[0].count),
    activeEmployees: Number(activeEmployeesResult.rows[0].count),
    inactiveEmployees: Number(inactiveEmployeesResult.rows[0].count),
    pendingInvitations: Number(
      pendingInvitationsResult.rows[0].count
    ),
  };
};

module.exports = {
  getOrganizationDashboard,
};