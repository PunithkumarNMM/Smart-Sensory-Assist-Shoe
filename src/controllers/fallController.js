const FallEvent = require("../models/FallEvent");
const Notification = require("../models/Notification");

// Create a new fall event
const createFallEvent = async (req, res) => {
  try {
    const fallEvent = new FallEvent(req.body);
    await fallEvent.save();
    const notification = new Notification({
  deviceId: fallEvent.deviceId,
  title: "Fall Detected",
  message: `A fall has been detected for device ${fallEvent.deviceId}.`,
  type: "FALL",
});

await notification.save();

    res.status(201).json({
      success: true,
      message: "Fall event saved successfully",
      data: fallEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all fall events for a device
const getFallHistory = async (req, res) => {
  try {
    const fallEvents = await FallEvent.find({
      deviceId: req.params.deviceId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: fallEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFallEvent,
  getFallHistory,
};