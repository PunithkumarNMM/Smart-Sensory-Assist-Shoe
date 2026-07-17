const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Import Middlewares
const errorHandler = require("./middleware/errorHandler");
const apiLimiter = require("./middleware/rateLimiter");

// Import Swagger Config
const swaggerSpec = require("./config/swagger");

// Security Middleware
app.use(helmet());

// General Middleware
app.use(cors());
app.use(express.json());

// Apply Rate Limiter to all API routes
app.use("/api", apiLimiter);

// Import Routes
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
const logger = require("./middleware/logger");

/**
 * @swagger
 * /
 *   get:
 *     summary: Check Backend Status
 *     description: Returns backend status.
 *     responses:
 *       200:
 *         description: Backend is running successfully.
 */

// Home Route
app.get("/", (req, res) => {
    res.json({
        project: "Smart Sensory Assist Shoe",
        version: "1.0.0",
        status: "Backend Running Successfully 🚀"
    });
});

// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// API Routes
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
app.use(logger);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;