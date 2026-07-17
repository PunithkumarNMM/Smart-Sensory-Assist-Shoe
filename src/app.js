const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Home Route
app.get("/", (req, res) => {
  res.json({
    project: "Smart Sensory Assist Shoe",
    version: "1.0.0",
    status: "Backend Running Successfully 🚀"
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/gps", gpsRoutes);
app.use("/api/fall", fallRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/device/status", deviceStatusRoutes);

module.exports = app;