const Device = require("../models/Device");

// Register a new Smart Shoe
const registerDevice = async (req, res) => {
    try {

        const { shoeName, esp32Mac } = req.body;

        const existingDevice = await Device.findOne({ esp32Mac });

        if (existingDevice) {
            return res.status(400).json({
                success: false,
                message: "Device already registered"
            });
        }

        const device = await Device.create({

            deviceId: "SHOE-" + Date.now(),

            shoeName,

            esp32Mac,

            parentId: req.user.id

        });

        return res.status(201).json({

            success: true,
            message: "Device Registered Successfully",
            device

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }
};

// Get all devices registered by the logged-in parent
const getMyDevices = async (req, res) => {
    try {

        const devices = await Device.find({
            parentId: req.user.id
        });

        return res.status(200).json({

            success: true,
            count: devices.length,
            devices

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }
};

// Update Device Status (Battery, Online/Offline, Last Seen)
const updateDeviceStatus = async (req, res) => {
    try {

        const { deviceId } = req.params;
        const { batteryLevel, status } = req.body;

        const device = await Device.findOne({ deviceId });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        device.batteryLevel = batteryLevel;
        device.status = status;
        device.lastSeen = new Date();

        await device.save();

        return res.status(200).json({

            success: true,
            message: "Device Status Updated Successfully",
            device

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }
};

module.exports = {
    registerDevice,
    getMyDevices,
    updateDeviceStatus
};