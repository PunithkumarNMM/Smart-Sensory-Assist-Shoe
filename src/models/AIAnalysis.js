const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },

    fallDetected: {
      type: Boolean,
      default: false,
    },

    emotion: {
      type: String,
      enum: ["Happy", "Calm", "Anxious", "Distressed", "Unknown"],
      default: "Unknown",
    },

    confidence: {
      type: Number,
      default: 0,
    },

    walkingPattern: {
      type: String,
      enum: ["Normal", "Slow", "Fast", "Abnormal"],
      default: "Normal",
    },

    speed: {
      type: Number,
      default: 0,
    },

    steps: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    recommendation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AIAnalysis", aiAnalysisSchema);