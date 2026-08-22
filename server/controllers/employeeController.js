const employeeService = require("../services/employeeService");
const getProfile = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const profile = await employeeService.getEmployeeProfile(
      userId,
      organizationId
    );
    res.status(200).json({
      success: true,
      message: "Employee profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Get employee profile error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to load profile",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const { name, phone, department, location } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    const profile = await employeeService.updateEmployeeProfile(
      userId,
      organizationId,
      {
        name: name.trim(),
        phone: phone ? phone.trim() : null,
        department: department ? department.trim() : null,
        location: location ? location.trim() : null,
      }
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Update employee profile error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to update profile",
    });
  }
};
const getDashboard = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const dashboard = await employeeService.getEmployeeDashboard(
      userId,
      organizationId
    );
    res.status(200).json({
      success: true,
      message: "Employee dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error("Get employee dashboard error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to load dashboard",
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  getDashboard,
};
