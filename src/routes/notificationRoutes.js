const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Get all notifications
router.get("/", getNotifications);

// Mark a single notification as read
router.patch("/:id/read", markNotificationAsRead);

// Mark all notifications as read
router.patch("/read-all", markAllNotificationsAsRead);

// Delete a notification
router.delete("/:id", deleteNotification);

module.exports = router;