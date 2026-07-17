const mongoose = require("mongoose");

const sosEventSchema = new mongoose.Schema(
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
    emergencyType: {
      type: String,
      default: "SOS",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "RESOLVED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SOSEvent", sosEventSchema);