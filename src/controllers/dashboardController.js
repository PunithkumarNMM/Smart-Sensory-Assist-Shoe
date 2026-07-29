const Device = require("../models/Device");
const Location = require("../models/Location");
const FallEvent = require("../models/FallEvent");
const SOSEvent = require("../models/SOSEvent");
const Notification = require("../models/Notification");
const User = require("../models/User");
const getDashboard = async (req, res) => {
  try {
    const { deviceId } = req.params;

    // Device Details
    const device = await Device.findOne({ deviceId });
const user = device
  ? await User.findById(device.parentId)
  : null;
    // Latest GPS
    const latestLocation = await Location.findOne({ deviceId })
      .sort({ createdAt: -1 });

    // Latest Fall
    const latestFall = await FallEvent.findOne({ deviceId })
      .sort({ createdAt: -1 });

    // Latest SOS
    const latestSOS = await SOSEvent.findOne({ deviceId })
      .sort({ createdAt: -1 });

    // Latest 10 Notifications
    const notifications = await Notification.find({ deviceId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
  success: true,
  data: {
    name: device?.ownerName || "",
    email: device?.ownerEmail || "",
    profileImage: device?.profileImage || "",
    deviceStatus: device ? "Connected" : "Disconnected",
    battery: device?.battery || 0,
    lastSync: device?.updatedAt || "",
    location: latestLocation
      ? `${latestLocation.latitude}, ${latestLocation.longitude}`
      : "Unknown"
  }
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};