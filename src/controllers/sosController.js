
const SOSEvent = require("../models/SOSEvent");
const Notification = require("../models/Notification");
const { getIO } = require("../socket/socket");
const { sendWhatsAppSOS } = require("../services/whatsappService");

// Create SOS Event
const createSOSEvent = async (req, res) => {
  try {
    console.log("🚨 UPDATED SOS CONTROLLER REACHED");
    console.log("📥 SOS request received:", req.body);

    // 1. Save SOS event.
    const sosEvent = new SOSEvent(req.body);
    await sosEvent.save();

    console.log("✅ SOS event saved:", sosEvent._id);

    // 2. Save in-app notification.
    const notification = new Notification({
      deviceId: sosEvent.deviceId,
      title: "SOS Alert",
      message: `SOS button was pressed for device ${sosEvent.deviceId}.`,
      type: "SOS",
    });

    await notification.save();

    // 3. Emit notifications to connected clients.
    try {
      const io = getIO();

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
    } catch (socketError) {
      console.error("⚠️ Socket error:", socketError.message);
    }

    // 4. Send WhatsApp alert automatically.
    let whatsapp;

    console.log("📲 Starting WhatsApp SOS request...");

    try {
      whatsapp = await sendWhatsAppSOS({
        deviceId: sosEvent.deviceId,
        latitude: sosEvent.latitude,
        longitude: sosEvent.longitude,
        message: sosEvent.message,
      });

      console.log("✅ WhatsApp result:", JSON.stringify(whatsapp));
    } catch (whatsappError) {
      console.error("❌ WhatsApp API error:", whatsappError.message);

      whatsapp = {
        success: false,
        error: whatsappError.message || "Unknown WhatsApp error",
      };
    }

    // 5. Return the SOS and WhatsApp status.
    return res.status(201).json({
      success: true,
      message: "SOS event saved successfully",
      data: sosEvent,
      whatsapp,
    });
  } catch (error) {
    console.error("❌ SOS controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process SOS",
    });
  }
};

// Get SOS History
const getSOSHistory = async (req, res) => {
  try {
    const history = await SOSEvent.find({
      deviceId: req.params.deviceId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error("❌ SOS history error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve SOS history",
    });
  }
};

module.exports = {
  createSOSEvent,
  getSOSHistory,
};
