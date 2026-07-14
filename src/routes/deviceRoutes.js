const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    registerDevice
} = require("../controllers/deviceController");

router.post("/register", authMiddleware, registerDevice);

module.exports = router;