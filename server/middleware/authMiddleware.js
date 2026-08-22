const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      "SELECT id, organization_id, role, status FROM users WHERE id = $1",
      [decoded.userId]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const currentUser = result.rows[0];
    if (currentUser.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "User account is not active",
      });
    }
    req.user = {
      userId: currentUser.id,
      organizationId: currentUser.organization_id,
      role: currentUser.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
module.exports = authenticate;
