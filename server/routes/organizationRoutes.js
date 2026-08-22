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
const { requireOrgAdmin } = require("../middleware/roleMiddleware");
const router = express.Router();
router.get(
  "/dashboard",
  authMiddleware,
  requireOrgAdmin,
  getOrganizationDashboard
);
router.get(
  "/employees",
  authMiddleware,
  requireOrgAdmin,
  getOrganizationEmployees
);
router.get(
  "/invitations",
  authMiddleware,
  requireOrgAdmin,
  getOrganizationInvitations
);
router.post(
  "/invitations",
  authMiddleware,
  requireOrgAdmin,
  createInvitation
);
router.get(
  "/settings",
  authMiddleware,
  requireOrgAdmin,
  getOrganizationSettings
);
router.put(
  "/settings",
  authMiddleware,
  requireOrgAdmin,
  updateOrganizationSettings
);
router.get(
  "/profile",
  authMiddleware,
  requireOrgAdmin,
  getOrganizationProfile
);
router.put(
  "/profile",
  authMiddleware,
  requireOrgAdmin,
  updateOrganizationProfile
);
module.exports = router;
