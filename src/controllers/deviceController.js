const Device = require("../models/Device");

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

        res.status(201).json({

            success: true,

            message: "Device Registered Successfully",

            device

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    registerDevice

};