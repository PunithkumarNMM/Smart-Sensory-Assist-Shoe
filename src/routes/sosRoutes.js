const express = require("express");
const router = express.Router();

const {
  createSOSEvent,
  getSOSHistory,
} = require("../controllers/sosController");

// Create a new SOS event
router.post("/", createSOSEvent);

// Get SOS history for a device
router.get("/history/:deviceId", getSOSHistory);

module.exports = router;