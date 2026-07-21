const express = require("express");

const router = express.Router();

const {
  getActivityAnalytics,
  updateActivityAnalytics,
} = require("../controllers/activityController");

// Get Activity Analytics
router.get("/analytics", getActivityAnalytics);

// Create / Update Activity
router.post("/update", updateActivityAnalytics);

module.exports = router;