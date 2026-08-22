const pool = require("../config/db");
const mapNotification = (row) => ({
  id: row.id,
  type: row.type,
  title: row.title,
  description: row.description,
  read: row.is_read,
  timestamp: row.created_at,
});
const getNotifications = async (organizationId, userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM notifications
    WHERE organization_id = $1
      AND user_id = $2
    ORDER BY created_at DESC
    `,
    [organizationId, userId]
  );
  return result.rows.map(mapNotification);
};
const markNotificationRead = async (id, organizationId, userId) => {
  const result = await pool.query(
    `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1
      AND organization_id = $2
      AND user_id = $3
    RETURNING *
    `,
    [id, organizationId, userId]
  );
  if (result.rows.length === 0) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }
  return mapNotification(result.rows[0]);
};
const markAllNotificationsRead = async (organizationId, userId) => {
  await pool.query(
    `
    UPDATE notifications
    SET is_read = TRUE
    WHERE organization_id = $1
      AND user_id = $2
      AND is_read = FALSE
    `,
    [organizationId, userId]
  );
  return getNotifications(organizationId, userId);
};
const createNotification = async (organizationId, userId, { type, title, description }) => {
  const result = await pool.query(
    `
    INSERT INTO notifications (
      organization_id, user_id, type, title, description
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [organizationId, userId, type, title, description || null]
  );
  return mapNotification(result.rows[0]);
};
module.exports = {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createNotification,
};
