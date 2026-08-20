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
    console.error(
      "Organization dashboard error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load organization dashboard",
    });
  }
};

module.exports = {
  getOrganizationDashboard,
};