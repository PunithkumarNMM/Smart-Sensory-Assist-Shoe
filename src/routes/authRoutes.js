const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
require("dotenv").config();
console.log("🔥 authRoutes loaded");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const app = express();

// ===============================
// Import Middlewares
// ===============================

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const apiLimiter = require("./middleware/rateLimiter");

// ===============================
// Swagger
// ===============================

const swaggerSpec = require("./config/swagger");

// ===============================
// Security Middleware
// ===============================


app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20mb"
}));

// ===============================
// Logger
// ===============================



// ===============================
// Rate Limiter
// ===============================



// ===============================
// Import Routes
// ===============================

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const gpsRoutes = require("./routes/gpsRoutes");
const fallRoutes = require("./routes/fallRoutes");
const sosRoutes = require("./routes/sosRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const deviceStatusRoutes = require("./routes/deviceStatusRoutes");
const cameraUpload = require("./routes/cameraUpload");
const activityRoutes = require("./routes/activityRoutes");
const childRoutes = require("./routes/childRoutes");
const aiRoutes = require("./routes/aiRoutes");
const guardianRoutes = require("./routes/guardianRoutes");

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {

    res.json({

        project: "Smart Sensory Assist Shoe",

        version: "1.0.0",

        status: "Backend Running Successfully 🚀"

    });

});

// ===============================
// Swagger Documentation
// ===============================

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api", protectedRoutes);

app.use("/api/device", deviceRoutes);

app.use("/api/gps", gpsRoutes);

app.use("/api/fall", fallRoutes);

app.use("/api/sos", sosRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/device/status", deviceStatusRoutes);

app.use("/api/camera", cameraUpload);

app.use("/api/activity", activityRoutes);

app.use("/api/child", childRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/guardians", guardianRoutes);

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

// ===============================
// Global Error Handler
// ===============================

app.use(errorHandler);

module.exports = app;
const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const {
    register,
    login,
    forgotPassword,
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage
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