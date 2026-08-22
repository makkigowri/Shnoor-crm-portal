const express = require("express");
const {
  registerOrganization,
  loginUser,
  getInvitationByToken,
  acceptInvitation,
} = require("../controllers/authController");
const router = express.Router();
router.post(
  "/register-organization",
  registerOrganization
);
router.post(
  "/login",
  loginUser
);
router.get(
  "/invitation/:token",
  getInvitationByToken
);
router.post(
  "/accept-invitation",
  acceptInvitation
);
module.exports = router;
