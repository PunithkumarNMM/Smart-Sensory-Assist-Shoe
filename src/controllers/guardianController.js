const Guardian = require("../models/Guardian");

// ======================
// Add Guardian
// ======================
const addGuardian = async (req, res) => {
  try {

    const guardian = await Guardian.create({
      userId: req.user.id,
      name: req.body.name,
      relationship: req.body.relationship,
      phone: req.body.phone,
      email: req.body.email,
      isPrimary: req.body.isPrimary ?? false,
    });

    res.status(201).json({
      success: true,
      message: "Guardian added successfully",
      data: guardian,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================
// Get Guardians
// ======================
const getGuardians = async (req, res) => {

  try {

    const guardians = await Guardian.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: guardians.length,
      data: guardians,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================
// Update Guardian
// ======================
const updateGuardian = async (req, res) => {

  try {

    const guardian = await Guardian.findOneAndUpdate(

      {
        _id: req.params.id,
        userId: req.user.id,
      },

      req.body,

      {
        new: true,
      }

    );

    if (!guardian) {

      return res.status(404).json({
        success: false,
        message: "Guardian not found",
      });

    }

    res.json({
      success: true,
      message: "Guardian updated successfully",
      data: guardian,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================
// Delete Guardian
// ======================
const deleteGuardian = async (req, res) => {

  try {

    const guardian = await Guardian.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!guardian) {

      return res.status(404).json({
        success: false,
        message: "Guardian not found",
      });

    }

    res.json({
      success: true,
      message: "Guardian deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  addGuardian,
  getGuardians,
  updateGuardian,
  deleteGuardian,
};