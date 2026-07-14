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

module.exports = app;