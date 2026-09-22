const Geofence = require("../models/Geofence");

// Get all geofences
const getGeofences = async (req, res) => {
  try {
    const geofences = await Geofence.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: geofences.length,
      data: geofences,
    });
  } catch (error) {
    console.error("Get geofences error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get geofences",
    });
  }
};

// Create a geofence
const createGeofence = async (req, res) => {
  try {
    const {
      name,
      latitude,
      longitude,
      radius,
      startTime,
      endTime,
      enabled,
    } = req.body;

    if (
      !name ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, latitude and longitude are required",
      });
    }

    const geofence = await Geofence.create({
      name,
      latitude,
      longitude,
      radius: radius || 100,
      startTime: startTime || "00:00",
      endTime: endTime || "23:59",
      enabled: enabled !== undefined ? enabled : true,
    });

    res.status(201).json({
      success: true,
      message: "Geofence created successfully",
      data: geofence,
    });
  } catch (error) {
    console.error("Create geofence error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create geofence",
    });
  }
};

module.exports = {
  getGeofences,
  createGeofence,
};