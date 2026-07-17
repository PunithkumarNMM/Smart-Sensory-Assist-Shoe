const { body } = require("express-validator");

const registerDeviceValidation = [
    body("shoeName")
        .trim()
        .notEmpty()
        .withMessage("Shoe name is required")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("Shoe name must be between 3 and 50 characters"),

    body("esp32Mac")
        .trim()
        .notEmpty()
        .withMessage("ESP32 MAC Address is required")
        .bail()
        .matches(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/)
        .withMessage("Invalid MAC Address format")
];

const updateDeviceValidation = [
    body("shoeName")
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Shoe name must be between 3 and 50 characters"),

    body("firmwareVersion")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Firmware version cannot be empty"),

    body("gpsEnabled")
        .optional()
        .isBoolean()
        .withMessage("gpsEnabled must be true or false"),

    body("cameraEnabled")
        .optional()
        .isBoolean()
        .withMessage("cameraEnabled must be true or false")
];

module.exports = {
    registerDeviceValidation,
    updateDeviceValidation
};