
const Device = require("../models/Device");
const FallEvent = require("../models/FallEvent");
const Notification = require("../models/Notification");
const { getIO } = require("../socket/socket");

const receiveDeviceEvent = async (req, res) => {
    try {
        // Authenticate the ESP32 using a shared secret.
        const expectedKey = process.env.DEVICE_EVENT_KEY;
        const suppliedKey = req.get("x-device-key");

        if (!expectedKey || suppliedKey !== expectedKey) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized device"
            });
        }

        const { esp32Mac, eventType, distanceCM } = req.body;

        if (
            typeof esp32Mac !== "string" ||
            !["OBSTACLE", "FALL"].includes(eventType)
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid esp32Mac and eventType are required"
            });
        }

        const device = await Device.findOne({
            esp32Mac: {
                $regex: new RegExp(
                    "^" + esp32Mac.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$",
                    "i"
                )
            }
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "ESP32 is not registered"
            });
        }

        device.status = "Online";
        device.lastSeen = new Date();
        await device.save();

        const isFall = eventType === "FALL";
        const title = isFall ? "Fall Detected" : "Obstacle Detected";
        const message = isFall
            ? `A fall was detected by ${device.shoeName}.`
            : `An obstacle was detected ${Number(distanceCM).toFixed(1)} cm away.`;

        const notification = await Notification.create({
            deviceId: device.deviceId,
            title,
            message,
            type: isFall ? "FALL" : "SYSTEM"
        });

        let fallEvent = null;

        if (isFall) {
            fallEvent = await FallEvent.create({
                deviceId: device.deviceId,
                fallDetected: true,
                severity: "HIGH"
            });
        }

        const io = getIO();

        io.emit("notification:created", {
            id: notification._id,
            deviceId: device.deviceId,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            createdAt: notification.createdAt
        });

        if (isFall) {
            io.emit("fall:detected", {
                id: fallEvent._id,
                deviceId: device.deviceId,
                severity: fallEvent.severity,
                timestamp: fallEvent.createdAt
            });
        } else {
            io.emit("obstacle:detected", {
                deviceId: device.deviceId,
                distanceCM: Number(distanceCM) || null,
                timestamp: notification.createdAt
            });
        }

        return res.status(201).json({
            success: true,
            message: `${eventType} event recorded`,
            deviceId: device.deviceId
        });
    } catch (error) {
        console.error("[DEVICE EVENT ERROR]", error);
        return res.status(500).json({
            success: false,
            message: "Failed to record device event"
        });
    }
};

module.exports = { receiveDeviceEvent };
