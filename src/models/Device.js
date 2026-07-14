const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
{
    deviceId: {
        type: String,
        required: true,
        unique: true
    },

    shoeName: {
        type: String,
        required: true
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    esp32Mac: {
        type: String,
        required: true,
        unique: true
    },

    firmwareVersion: {
        type: String,
        default: "1.0.0"
    },

    batteryLevel: {
        type: Number,
        default: 100
    },

    gpsEnabled: {
        type: Boolean,
        default: true
    },

    cameraEnabled: {
        type: Boolean,
        default: true
    },

    status: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Offline"
    },

    lastSeen: {
        type: Date,
        default: Date.now
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Device", deviceSchema);