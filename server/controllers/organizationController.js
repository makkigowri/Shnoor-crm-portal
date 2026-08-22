const organizationService = require("../services/organizationService");
const getOrganizationDashboard = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const dashboard =
      await organizationService.getOrganizationDashboard(
        organizationId
      );
    res.status(200).json({
      success: true,
      message: "Organization dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error("Organization dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load organization dashboard",
    });
  }
};
const getOrganizationEmployees = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const employees =
      await organizationService.getOrganizationEmployees(
        organizationId
      );
    res.status(200).json({
      success: true,
      message: "Organization employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    console.error("Organization employees error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load organization employees",
    });
  }
};
const createInvitation = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const invitedBy = req.user.userId;
    const {
      email,
      role = "SALES_EXECUTIVE",
    } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Employee email is required",
      });
    }
    const invitation =
      await organizationService.createInvitation({
        organizationId,
        invitedBy,
        email,
        role,
      });
    res.status(201).json({
      success: true,
      message: "Employee invitation created successfully",
      data: invitation,
    });
  } catch (error) {
    console.error("Create invitation error:", error);
    if (
      error.message === "Employee already exists" ||
      error.message === "A pending invitation already exists" ||
      error.message === "Invalid employee role"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create invitation",
    });
  }
};
const getOrganizationInvitations = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const invitations =
      await organizationService.getOrganizationInvitations(
        organizationId
      );
    res.status(200).json({
      success: true,
      message: "Organization invitations fetched successfully",
      data: invitations,
    });
  } catch (error) {
    console.error("Get invitations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load invitations",
    });
  }
};
const getOrganizationSettings = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const settings =
      await organizationService.getOrganizationSettings(
        organizationId
      );
    res.status(200).json({
      success: true,
      message: "Organization settings fetched successfully",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Get organization settings error:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to load organization settings",
    });
  }
};
const updateOrganizationSettings = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Organization name is required",
      });
    }
    const settings =
      await organizationService.updateOrganizationSettings(
        organizationId,
        name.trim()
      );
    res.status(200).json({
      success: true,
      message: "Organization settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Update organization settings error:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to update organization settings",
    });
  }
};
const getOrganizationProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile =
      await organizationService.getOrganizationProfile(
        userId
      );
    res.status(200).json({
      success: true,
      message: "Organization profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    console.error(
      "Get organization profile error:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};


const updateOrganizationProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const profile =
      await organizationService.updateOrganizationProfile(
        userId,
        name.trim()
      );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });

  } catch (error) {
    console.error(
      "Update organization profile error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


module.exports = {
  getOrganizationDashboard,
  getOrganizationEmployees,
  createInvitation,
  getOrganizationInvitations,
  getOrganizationSettings,
  updateOrganizationSettings,
  getOrganizationProfile,
  updateOrganizationProfile,
};