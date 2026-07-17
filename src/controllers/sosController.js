const SOSEvent = require("../models/SOSEvent");
const Notification = require("../models/Notification");

// Create SOS Event
const createSOSEvent = async (req, res) => {
  try {
    const sosEvent = new SOSEvent(req.body);
    await sosEvent.save();
    const notification = new Notification({
  deviceId: sosEvent.deviceId,
  title: "SOS Alert",
  message: `SOS button was pressed for device ${sosEvent.deviceId}.`,
  type: "SOS",
});

await notification.save();

    res.status(201).json({
      success: true,
      message: "SOS event created successfully",
      data: sosEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get SOS History
const getSOSHistory = async (req, res) => {
  try {
    const sosEvents = await SOSEvent.find({
      deviceId: req.params.deviceId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: sosEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSOSEvent,
  getSOSHistory,
};