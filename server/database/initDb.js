const fs = require("fs");
const path = require("path");
const pool = require("../config/db");
const initializeDatabase = async () => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("Database schema initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
};
module.exports = initializeDatabase;