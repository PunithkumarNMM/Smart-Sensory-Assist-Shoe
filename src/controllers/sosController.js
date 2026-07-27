const SOSEvent = require("../models/SOSEvent");
const Notification = require("../models/Notification");
const { getIO } = require("../socket/socket");

// ============================
// Create SOS Event
// ============================
const createSOSEvent = async (req, res) => {
  try {

    const io = getIO();

    const sosEvent = new SOSEvent(req.body);
    await sosEvent.save();

    const notification = new Notification({
      deviceId: sosEvent.deviceId,
      title: "SOS Alert",
      message: `SOS button was pressed for device ${sosEvent.deviceId}.`,
      type: "SOS",
    });

    await notification.save();

    io.emit("notification:created", {
      _id: notification._id,
      deviceId: notification.deviceId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    });

    io.emit("sos:created", {
      id: sosEvent._id,
      deviceId: sosEvent.deviceId,
      latitude: sosEvent.latitude,
      longitude: sosEvent.longitude,
      message: sosEvent.message,
      timestamp: sosEvent.createdAt,
    });

    console.log("🆘 SOS Alert Emitted");

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

// ============================
// Get SOS History
// ============================
const getSOSHistory = async (req, res) => {

  try {

    const history = await SOSEvent.find({
      deviceId: req.params.deviceId,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
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