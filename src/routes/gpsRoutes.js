const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    updateLocation,
    getLiveLocation,
    getLocationHistory
} = require("../controllers/gpsController");

router.post("/update", authMiddleware, updateLocation);

router.get("/live/:deviceId", authMiddleware, getLiveLocation);

router.get("/history/:deviceId", authMiddleware, getLocationHistory);

module.exports = router;