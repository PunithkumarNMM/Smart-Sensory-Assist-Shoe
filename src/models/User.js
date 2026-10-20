const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "parent"
    },

    profileImage: {
        type: String,
        default: ""
    },

    // --- NEW FIELDS FOR SMART SHOE SOS ---
    deviceId: {
        type: String,
        default: "",
        unique: true,
        sparse: true // Allows users without a shoe device to register without unique conflict
    },

    fcmToken: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);