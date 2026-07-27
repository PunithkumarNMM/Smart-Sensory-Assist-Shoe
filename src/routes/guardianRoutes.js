const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addGuardian,
  getGuardians,
  updateGuardian,
  deleteGuardian,
} = require("../controllers/guardianController");

// Add Guardian
router.post(
  "/",
  authMiddleware,
  addGuardian
);

// Get All Guardians
router.get(
  "/",
  authMiddleware,
  getGuardians
);

// Update Guardian
router.put(
  "/:id",
  authMiddleware,
  updateGuardian
);

// Delete Guardian
router.delete(
  "/:id",
  authMiddleware,
  deleteGuardian
);

module.exports = router;