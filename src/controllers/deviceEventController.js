
const Device = require("../models/Device");
const FallEvent = require("../models/FallEvent");
const Notification = require("../models/Notification");
const User = require("../models/User");
const admin = require("../config/firebase");
const { getIO } = require("../socket/socket");

const receiveDeviceEvent = async (req, res) => {
    try {
        // 1. Authenticate the ESP32 using the shared secret.
        const expectedKey = process.env.DEVICE_EVENT_KEY;
        const suppliedKey = req.get("x-device-key");

        if (!expectedKey || suppliedKey !== expectedKey) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized device"
            });
        }

        // 2. Validate the incoming event.
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

        // 3. Find the registered shoe.
        const normalizedMac = esp32Mac.trim().toUpperCase();

        const device = await Device.findOne({
            esp32Mac: normalizedMac
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "ESP32 is not registered"
            });
        }

        // 4. Update device status.
        device.status = "Online";
        device.lastSeen = new Date();
        await device.save();

        // 5. Prepare the notification.
        const isFall = eventType === "FALL";

        const title = isFall
            ? "🚨 Fall Detected - Smart Shoe"
            : "⚠️ Obstacle Detected - Smart Shoe";

        const message = isFall
            ? `A fall was detected by ${device.shoeName}.`
            : `An obstacle was detected ${
                Number.isFinite(Number(distanceCM))
                    ? Number(distanceCM).toFixed(1)
                    : "nearby"
            } cm away.`;

        // 6. Save notification in MongoDB.
        const notification = await Notification.create({
            deviceId: device.deviceId,
            title,
            message,
            type: isFall ? "FALL" : "SYSTEM"
        });

        // 7. Save confirmed fall in fall history.
        let fallEvent = null;

        if (isFall) {
            fallEvent = await FallEvent.create({
                deviceId: device.deviceId,
                fallDetected: true,
                severity: "HIGH"
            });
        }

        // 8. Send push notification to the shoe owner's phone.
        // A push failure must not prevent the event being recorded.
        try {
            const user = await User.findById(device.parentId);

            if (user && user.fcmToken) {
                const fcmPayload = {
                    notification: {
                        title,
                        body: message
                    },
                    data: {
                        screen: isFall
                            ? "ai_detection"
                            : "notifications",
                        deviceId: device.deviceId,
                        eventType,
                        distanceCM:
                            Number.isFinite(Number(distanceCM))
                                ? String(distanceCM)
                                : ""
                    },
                    token: user.fcmToken
                };

                const fcmResult =
                    await admin.messaging().send(fcmPayload);

                console.log(
                    "[FCM SUCCESS] Device event push sent:",
                    fcmResult
                );
            } else {
                console.warn(
                    "[FCM WARNING] Shoe owner or FCM token not found"
                );
            }
        } catch (fcmError) {
            console.error(
                "[FCM ERROR]",
                fcmError.message
            );
        }

        // 9. Emit real-time Socket.IO events.
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
                distanceCM:
                    Number.isFinite(Number(distanceCM))
                        ? Number(distanceCM)
                        : null,
                timestamp: notification.createdAt
            });
        }

        // 10. Return success to the ESP32.
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
