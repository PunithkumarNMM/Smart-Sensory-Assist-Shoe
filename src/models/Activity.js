const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },

    steps: {
      type: Number,
      default: 0,
    },

    walkingTime: {
      type: String,
      default: "0m",
    },

    standingTime: {
      type: String,
      default: "0m",
    },

    restingTime: {
      type: String,
      default: "0m",
    },

    fallCount: {
      type: Number,
      default: 0,
    },

    chartData: [
      {
        name: String,
        value: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);