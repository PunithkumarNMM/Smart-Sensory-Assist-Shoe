const express = require("express");
const router = express.Router();

const {
  createFallEvent,
  getFallHistory,
} = require("../controllers/fallController");

// Create a new fall event
router.post("/", createFallEvent);

// Get fall history for a device
router.get("/history/:deviceId", getFallHistory);

module.exports = router;