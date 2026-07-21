const Device = require("../models/Device");
const { getIO } = require("../socket/socket");

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

// Get a single device by Device ID
const getDeviceById = async (req, res) => {
    try {

        const { deviceId } = req.params;

        const device = await Device.findOne({
            deviceId,
            parentId: req.user.id
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        return res.status(200).json({
            success: true,
            device
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update device details
const updateDevice = async (req, res) => {
    try {

        const { deviceId } = req.params;

        const {
            shoeName,
            firmwareVersion,
            gpsEnabled,
            cameraEnabled
        } = req.body;

        const device = await Device.findOne({
            deviceId,
            parentId: req.user.id
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        if (shoeName !== undefined)
            device.shoeName = shoeName;

        if (firmwareVersion !== undefined)
            device.firmwareVersion = firmwareVersion;

        if (gpsEnabled !== undefined)
            device.gpsEnabled = gpsEnabled;

        if (cameraEnabled !== undefined)
            device.cameraEnabled = cameraEnabled;

        await device.save();

        return res.status(200).json({
            success: true,
            message: "Device updated successfully",
            device
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

        if (batteryLevel !== undefined)
            device.batteryLevel = batteryLevel;

        if (status)
            device.status = status;

        device.lastSeen = new Date();

        await device.save();
        // Emit Live Device Status
const io = getIO();

io.emit("device:status", {
    deviceId: device.deviceId,
    status: device.status,
    batteryLevel: device.batteryLevel,
    lastSeen: device.lastSeen
});

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

// Delete Device
const deleteDevice = async (req, res) => {
    try {

        const { deviceId } = req.params;

        const device = await Device.findOneAndDelete({
            deviceId,
            parentId: req.user.id
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Device deleted successfully"
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
    getDeviceById,
    updateDevice,
    updateDeviceStatus,
    deleteDevice
};