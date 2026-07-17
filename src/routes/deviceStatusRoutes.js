const express = require("express");
const router = express.Router();

const {
  updateDeviceStatus,
} = require("../controllers/deviceStatusController");

// Update device status
router.post("/", updateDeviceStatus);

module.exports = router;