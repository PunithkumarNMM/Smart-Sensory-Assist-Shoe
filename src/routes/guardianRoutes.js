const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addGuardian,
  getGuardians,
  getGuardianById,
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

// Get Guardian By ID
router.get(
  "/:id",
  authMiddleware,
  getGuardianById
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