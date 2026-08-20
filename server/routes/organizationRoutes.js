const express = require("express");

const {
  getOrganizationDashboard,
} = require("../controllers/organizationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  getOrganizationDashboard
);

module.exports = router;