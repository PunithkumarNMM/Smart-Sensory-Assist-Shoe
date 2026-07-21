const express = require("express");

const {
  getLatestAnalysis,
  analyzeData,
  getHistory,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get latest AI analysis
router.get("/latest", authMiddleware, getLatestAnalysis);

// Save AI analysis
router.post("/analyze", authMiddleware, analyzeData);

// Get AI history
router.get("/history", authMiddleware, getHistory);

module.exports = router;