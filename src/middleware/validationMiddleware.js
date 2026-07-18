const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    console.log("Request Body:", req.body);
    console.log("Validation Errors:", errors.array());

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }

    next();
};

module.exports = validate;