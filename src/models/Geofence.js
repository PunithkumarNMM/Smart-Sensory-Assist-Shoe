const mongoose = require("mongoose");

const geofenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    radius: {
      type: Number,
      required: true,
      min: 20,
      default: 100,
    },

    startTime: {
      type: String,
      required: true,
      default: "00:00",
    },

    endTime: {
      type: String,
      required: true,
      default: "23:59",
    },

    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Geofence", geofenceSchema);