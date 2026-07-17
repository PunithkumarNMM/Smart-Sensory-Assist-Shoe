const mongoose = require("mongoose");

const fallEventSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    fallDetected: {
      type: Boolean,
      default: true,
    },
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "HIGH",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FallEvent", fallEventSchema);