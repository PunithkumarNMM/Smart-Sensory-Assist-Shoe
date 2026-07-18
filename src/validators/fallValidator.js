const { body } = require("express-validator");

const fallEventValidation = [
    body("deviceId")
        .trim()
        .notEmpty()
        .withMessage("Device ID is required"),

    body("latitude")
        .notEmpty()
        .withMessage("Latitude is required")
        .bail()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be between -90 and 90"),

    body("longitude")
        .notEmpty()
        .withMessage("Longitude is required")
        .bail()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be between -180 and 180"),

    body("severity")
        .optional()
        .isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("Severity must be LOW, MEDIUM, or HIGH")
];

module.exports = {
    fallEventValidation
};