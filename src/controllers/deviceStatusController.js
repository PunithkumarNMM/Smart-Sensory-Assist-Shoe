const Device = require("../models/Device");
const { getIO } = require("../socket/socket");

// ==============================
// Update Device Status
// ==============================
const updateDeviceStatus = async (req, res) => {
  try {
    console.log(">>> updateDeviceStatus called");

    // Prevent crash if req.body is missing
    const { deviceId, batteryLevel, status } = req.body || {};

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "deviceId is required",
      });
    }

    const device = await Device.findOne({ deviceId });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    if (batteryLevel !== undefined) {
      device.batteryLevel = batteryLevel;
    }

    if (status !== undefined) {
      device.status = status;
    }

    device.lastSeen = new Date();

    await device.save();

    const io = getIO();

    io.emit("device:status", {
      deviceId: device.deviceId,
      batteryLevel: device.batteryLevel,
      status: device.status,
      lastSeen: device.lastSeen,
    });

    console.log("🔋 Device Status Emitted");

    return res.status(200).json({
      success: true,
      message: "Device status updated successfully",
      data: device,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Device Status
// ==============================
const getDeviceStatus = async (req, res) => {
  try {
    console.log(">>> getDeviceStatus called");

    const { deviceId } = req.params;

    const device = await Device.findOne({ deviceId });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        deviceId: device.deviceId,
        batteryLevel: device.batteryLevel,
        status: device.status,
        lastSeen: device.lastSeen,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updateDeviceStatus,
  getDeviceStatus,
};