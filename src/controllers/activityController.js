const Activity = require("../models/Activity");

// Get Activity Analytics
const getActivityAnalytics = async (req, res) => {
  try {
    const { deviceId } = req.query;

    const activity = await Activity.findOne({ deviceId });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity data not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error("Activity Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity analytics.",
    });
  }
};

// Create or Update Activity
const updateActivityAnalytics = async (req, res) => {
  try {
    const {
      deviceId,
      steps,
      walkingTime,
      standingTime,
      restingTime,
      fallCount,
      chartData,
    } = req.body;

    const activity = await Activity.findOneAndUpdate(
      { deviceId },
      {
        steps,
        walkingTime,
        standingTime,
        restingTime,
        fallCount,
        chartData,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Activity updated successfully.",
      data: activity,
    });
  } catch (error) {
    console.error("Update Activity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update activity.",
    });
  }
};

module.exports = {
  getActivityAnalytics,
  updateActivityAnalytics,
};