const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const {
    register,
    login,
    forgotPassword,
    getProfile,
    updateProfile
} = require("../controllers/authController");

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
router.get(
    "/profile",
    authMiddleware,
    getProfile
);
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

module.exports = router;