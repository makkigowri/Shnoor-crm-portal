const notificationService = require("../services/notificationService");
const getNotifications = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const notifications = await notificationService.getNotifications(organizationId, userId);
    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to load notifications",
    });
  }
};
const markNotificationRead = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const notification = await notificationService.markNotificationRead(req.params.id, organizationId, userId);
    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to update notification",
    });
  }
};
const markAllNotificationsRead = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const notifications = await notificationService.markAllNotificationsRead(organizationId, userId);
    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      data: notifications,
    });
  } catch (error) {
    console.error("Mark all notifications read error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to update notifications",
    });
  }
};
module.exports = {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};
