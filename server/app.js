const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const authenticate = require("./middleware/authMiddleware");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CRM API is running",
  });
});
app.use("/api/auth", authRoutes);
app.get("/api/auth/me", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});
app.use("/api/organization", organizationRoutes);
app.use("/api/employee", employeeRoutes);
module.exports = app;