const Location = require("../models/Location");
const Device = require("../models/Device");

// Update GPS Location
const updateLocation = async (req, res) => {

    try {

        const {
            deviceId,
            latitude,
            longitude,
            speed,
            accuracy
        } = req.body;

        const device = await Device.findOne({ deviceId });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        const location = await Location.create({

            deviceId,
            latitude,
            longitude,
            speed,
            accuracy

        });

        return res.status(201).json({

            success: true,
            message: "Location Updated Successfully",
            location

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get Latest GPS Location
const getLiveLocation = async (req, res) => {

    try {

        const { deviceId } = req.params;

        const location = await Location.findOne({
            deviceId
        }).sort({
            createdAt: -1
        });

        if (!location) {

            return res.status(404).json({

                success: false,
                message: "No location found"

            });

        }

        return res.status(200).json({

            success: true,
            location

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Get Complete GPS History
const getLocationHistory = async (req, res) => {

    try {

        const { deviceId } = req.params;

        const locations = await Location.find({
            deviceId
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({

            success: true,
            count: locations.length,
            locations

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    updateLocation,
    getLiveLocation,
    getLocationHistory

};