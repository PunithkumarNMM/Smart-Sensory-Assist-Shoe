const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");

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

module.exports = app;