const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middleware/authMiddleware");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/auth/me", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CRM API is running",
  });
});


app.use("/api/auth", authRoutes);

module.exports = app;