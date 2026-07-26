const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");

// Debug (remove later)
console.log(authController);

// ================= REGISTER =================

router.post(
    "/register",
    registerValidation,
    validate,
    authController.register
);

// ================= LOGIN =================

router.post(
    "/login",
    loginValidation,
    validate,
    authController.login
);

// ================= FORGOT PASSWORD =================

router.post(
    "/forgot-password",
    authController.forgotPassword
);

module.exports = router;