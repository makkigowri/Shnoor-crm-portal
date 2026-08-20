const express = require("express");

const {
  registerOrganization,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// Organization registration
router.post(
  "/register-organization",
  registerOrganization
);

// User login
router.post(
  "/login",
  loginUser
);

module.exports = router;