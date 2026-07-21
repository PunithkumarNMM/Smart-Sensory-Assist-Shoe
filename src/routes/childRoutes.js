const express = require("express");

const router = express.Router();

const {
  createChild,
  getAllChildren,
  getChildById,
  updateChild,
  deleteChild,
} = require("../controllers/childController");

// Create Child Profile
router.post("/", createChild);

// Get All Child Profiles
router.get("/", getAllChildren);

// Get Child Profile by ID
router.get("/:id", getChildById);

// Update Child Profile
router.put("/:id", updateChild);

// Delete Child Profile
router.delete("/:id", deleteChild);

module.exports = router;