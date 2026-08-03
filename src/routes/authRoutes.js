const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");

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

// ================= PROFILE =================

router.get(
    "/profile",
    authMiddleware,
    authController.getProfile
);

router.put(
    "/profile",
    authMiddleware,
    authController.updateProfile
);

router.put(
    "/change-password",
    authMiddleware,
    authController.changePassword
);

router.post(
    "/upload-profile-image",
    authMiddleware,
    upload.single("image"),
    authController.uploadProfileImage
);

module.exports = router;