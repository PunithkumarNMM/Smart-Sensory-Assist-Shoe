const express = require("express");

const {
  getGeofences,
  createGeofence,
} = require("../controllers/geofenceController");

const router = express.Router();

// Get all geofences
router.get("/", getGeofences);

// Create a geofence
router.post("/", createGeofence);

module.exports = router;