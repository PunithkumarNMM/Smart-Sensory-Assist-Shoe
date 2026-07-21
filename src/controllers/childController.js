const Child = require("../models/Child");

/**
 * @desc    Create Child Profile
 * @route   POST /api/child
 */
exports.createChild = async (req, res) => {
  try {
    const child = await Child.create(req.body);

    res.status(201).json({
      success: true,
      message: "Child profile created successfully",
      data: child,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get All Child Profiles
 * @route   GET /api/child
 */
exports.getAllChildren = async (req, res) => {
  try {
    const children = await Child.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get Child By ID
 * @route   GET /api/child/:id
 */
exports.getChildById = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: child,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update Child Profile
 * @route   PUT /api/child/:id
 */
exports.updateChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Child profile updated successfully",
      data: child,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete Child Profile
 * @route   DELETE /api/child/:id
 */
exports.deleteChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child profile not found",
      });
    }

    await Child.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Child profile deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};