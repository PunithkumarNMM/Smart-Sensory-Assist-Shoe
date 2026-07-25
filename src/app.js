require("dotenv").config();

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
const cameraRoutes = require("./routes/cameraRoutes");
const activityRoutes = require("./routes/activityRoutes");
const childRoutes = require("./routes/childRoutes");
const aiRoutes = require("./routes/aiRoutes");

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

app.use("/api/camera", cameraRoutes);

app.use("/api/activity", activityRoutes);

app.use("/api/child", childRoutes);

app.use("/api/ai", aiRoutes);

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