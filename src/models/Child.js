const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    autismLevel: {
      type: String,
      enum: ["Mild", "Moderate", "Severe"],
      default: "Moderate",
    },

    medicalNotes: {
      type: String,
      default: "",
    },

    guardianName: {
      type: String,
      required: true,
    },

    guardianPhone: {
      type: String,
      required: true,
    },

    guardianEmail: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    deviceId: {
      type: String,
      required: true,
      unique: true,
    },

    photo: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Child", childSchema);