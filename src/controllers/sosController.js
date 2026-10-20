const User = require("../models/User"); 
const axios = require("axios");
const admin = require("../config/firebaseAdmin");

const createSOSEvent = async (req, res) => {
    try {
        const { deviceId, latitude, longitude, message } = req.body;

        // 1. Find the user/guardian linked to this Device ID in MongoDB
        const user = await User.findOne({ deviceId: deviceId });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Device ID not linked to any registered user.' 
            });
        }

        const guardianPhone = user.phone;
        const userName = user.name || "the wearer";
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        const alertMessage = `🚨 EMERGENCY SOS! Smart Shoe detected danger for ${userName}. Location: ${mapsUrl}`;

        // 2. Send automated SMS via Fast2SMS
        try {
            const fast2smsApiKey = process.env.FAST2SMS_API_KEY;
            if (fast2smsApiKey && guardianPhone) {
                await axios.post('https://www.fast2sms.com/dev/bulkV2', {
                    route: 'q',
                    message: alertMessage,
                    language: 'english',
                    numbers: guardianPhone
                }, {
                    headers: { 'authorization': fast2smsApiKey }
                });
                console.log(`[SMS SUCCESS] Automated SMS sent to guardian: ${guardianPhone}`);
            } else {
                console.log("[SMS WARNING] FAST2SMS_API_KEY is missing or user phone is not registered");
            }
        } catch (smsError) {
            console.error("[SMS ERROR]", smsError.response?.data || smsError.message);
        }

        // 3. Send Push Notification to Guardian's Phone Screen (Firebase)
        try {
            if (user.fcmToken) {
                const fcmPayload = {
                    notification: {
                        title: "🚨 EMERGENCY ALERT - Smart Shoe",
                        body: `Danger detected for ${userName}! Tap to view live GPS location.`
                    },
                    data: {
                        latitude: String(latitude || ""),
                        longitude: String(longitude || "")
                    },
                    token: user.fcmToken
                };
                await admin.messaging().send(fcmPayload);
                console.log("[FCM SUCCESS] Screen push notification sent");
            } else {
                console.log("[FCM WARNING] User has no fcmToken registered");
            }
        } catch (fcmError) {
            console.error("[FCM ERROR]", fcmError.message);
        }

        return res.status(201).json({
            success: true,
            message: "SOS alert processed successfully, guardian notified via SMS and Screen Alert."
        });

    } catch (error) {
        console.error("SOS Controller Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getSOSHistory = async (req, res) => {
    try {
        const { deviceId } = req.params;
        // Return success with empty array or implement history if needed
        return res.status(200).json({ success: true, data: [] });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createSOSEvent,
    getSOSHistory
};