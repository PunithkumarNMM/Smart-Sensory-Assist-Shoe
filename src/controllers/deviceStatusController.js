const Device = require("../models/Device");

// Update device status
const updateDeviceStatus = async (req, res) => {
  try {
    const { deviceId, batteryLevel, status } = req.body;

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

    if (status) {
      device.status = status;
    }

    device.lastSeen = new Date();

    await device.save();

    res.status(200).json({
      success: true,
      message: "Device status updated successfully",
      data: device,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updateDeviceStatus,
};