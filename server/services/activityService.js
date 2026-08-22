const pool = require("../config/db");
const ACTIVITY_TYPES = ["Call", "Email", "Meeting", "Lead Update", "Customer Update", "Deal Update"];
const mapActivity = (row) => ({
  id: row.id,
  title: row.title,
  relatedTo: row.related_to,
  type: row.type,
  timestamp: row.occurred_at,
  ownerId: row.owner_id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});
const getActivities = async (organizationId, ownerId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM activities
    WHERE organization_id = $1
      AND owner_id = $2
    ORDER BY occurred_at DESC
    `,
    [organizationId, ownerId]
  );
  return result.rows.map(mapActivity);
};
const getActivityById = async (id, organizationId, ownerId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM activities
    WHERE id = $1
      AND organization_id = $2
      AND owner_id = $3
    `,
    [id, organizationId, ownerId]
  );
  if (result.rows.length === 0) {
    const error = new Error("Activity not found");
    error.statusCode = 404;
    throw error;
  }
  return mapActivity(result.rows[0]);
};
const createActivity = async (organizationId, ownerId, payload) => {
  const { title, relatedTo, type, timestamp } = payload;
  if (!title) {
    const error = new Error("Activity title is required");
    error.statusCode = 400;
    throw error;
  }
  const finalType = type || "Call";
  if (!ACTIVITY_TYPES.includes(finalType)) {
    const error = new Error("Invalid activity type");
    error.statusCode = 400;
    throw error;
  }
  const result = await pool.query(
    `
    INSERT INTO activities (
      organization_id, owner_id, title, related_to, type, occurred_at
    )
    VALUES ($1, $2, $3, $4, $5, COALESCE($6, CURRENT_TIMESTAMP))
    RETURNING id
    `,
    [organizationId, ownerId, title, relatedTo || null, finalType, timestamp || null]
  );
  return getActivityById(result.rows[0].id, organizationId, ownerId);
};
const updateActivity = async (id, organizationId, ownerId, payload) => {
  const { title, relatedTo, type, timestamp } = payload;
  if (type && !ACTIVITY_TYPES.includes(type)) {
    const error = new Error("Invalid activity type");
    error.statusCode = 400;
    throw error;
  }
  const result = await pool.query(
    `
    UPDATE activities
    SET
      title = COALESCE($1, title),
      related_to = COALESCE($2, related_to),
      type = COALESCE($3, type),
      occurred_at = COALESCE($4, occurred_at),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
      AND organization_id = $6
      AND owner_id = $7
    RETURNING id
    `,
    [title || null, relatedTo || null, type || null, timestamp || null, id, organizationId, ownerId]
  );
  if (result.rows.length === 0) {
    const error = new Error("Activity not found");
    error.statusCode = 404;
    throw error;
  }
  return getActivityById(id, organizationId, ownerId);
};
const deleteActivity = async (id, organizationId, ownerId) => {
  const result = await pool.query(
    `
    DELETE FROM activities
    WHERE id = $1
      AND organization_id = $2
      AND owner_id = $3
    RETURNING id
    `,
    [id, organizationId, ownerId]
  );
  if (result.rows.length === 0) {
    const error = new Error("Activity not found");
    error.statusCode = 404;
    throw error;
  }
  return { id };
};
module.exports = {
  ACTIVITY_TYPES,
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
