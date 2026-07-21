const AIAnalysis = require("../models/AIAnalysis");
const { getIO } = require("../socket/socket");

// Get Latest AI Analysis
const getLatestAnalysis = async (req, res) => {
  try {
    const latest = await AIAnalysis.findOne().sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        success: false,
        message: "No AI analysis found",
      });
    }

    res.status(200).json({
      success: true,
      data: latest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Save AI Analysis
const analyzeData = async (req, res) => {
  try {
    const analysis = await AIAnalysis.create(req.body);

    // 🚀 Send live update to all connected dashboards
    getIO().emit("ai-update", analysis);

    res.status(201).json({
      success: true,
      message: "AI Analysis saved successfully",
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get AI History
const getHistory = async (req, res) => {
  try {
    const history = await AIAnalysis.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getLatestAnalysis,
  analyzeData,
  getHistory,
};