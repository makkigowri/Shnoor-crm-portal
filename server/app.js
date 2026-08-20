const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const authenticate = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CRM API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Authentication check
app.get("/api/auth/me", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});

// Organization routes
app.use("/api/organization", organizationRoutes);

module.exports = app;