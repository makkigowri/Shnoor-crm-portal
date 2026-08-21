const express = require("express");

const {
  getOrganizationDashboard,
  getOrganizationEmployees,
  createInvitation,
  getOrganizationInvitations,
  getOrganizationSettings,
  updateOrganizationSettings,
  getOrganizationProfile,
  updateOrganizationProfile,
} = require("../controllers/organizationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ============================================================
// DASHBOARD
// ============================================================

router.get(
  "/dashboard",
  authMiddleware,
  getOrganizationDashboard
);


// ============================================================
// EMPLOYEES
// ============================================================

router.get(
  "/employees",
  authMiddleware,
  getOrganizationEmployees
);


// ============================================================
// INVITATIONS
// ============================================================

router.get(
  "/invitations",
  authMiddleware,
  getOrganizationInvitations
);

router.post(
  "/invitations",
  authMiddleware,
  createInvitation
);


// ============================================================
// ORGANIZATION SETTINGS
// ============================================================

router.get(
  "/settings",
  authMiddleware,
  getOrganizationSettings
);

router.put(
  "/settings",
  authMiddleware,
  updateOrganizationSettings
);


// ============================================================
// ORGANIZATION PROFILE
// ============================================================

router.get(
  "/profile",
  authMiddleware,
  getOrganizationProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateOrganizationProfile
);


module.exports = router;