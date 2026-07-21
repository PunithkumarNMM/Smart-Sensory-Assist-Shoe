const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const { uploadGPSValidation } = require("../validators/gpsValidator");

const {
  updateLocation,
  getLiveLocation,
  getLocationHistory,
} = require("../controllers/gpsController");

// Upload GPS
router.post(
  "/update",
  authMiddleware,
  uploadGPSValidation,
  validate,
  updateLocation
);

// Live GPS
router.get(
  "/live/:deviceId",
  authMiddleware,
  getLiveLocation
);

// GPS History
router.get(
  "/history/:deviceId",
  authMiddleware,
  getLocationHistory
);

module.exports = router;