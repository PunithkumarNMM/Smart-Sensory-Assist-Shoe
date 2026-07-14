const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    registerDevice,
    getMyDevices
} = require("../controllers/deviceController");

router.post("/register", authMiddleware, registerDevice);

router.get("/my-devices", authMiddleware, getMyDevices);

module.exports = router;