let cameraStatus = false;

// Get camera status
const getCameraStatus = async (req, res) => {
  res.status(200).json({
    success: true,
    cameraEnabled: cameraStatus,
  });
};

// Start camera
const startCamera = async (req, res) => {
  cameraStatus = true;

  res.status(200).json({
    success: true,
    message: "Camera started",
  });
};

// Stop camera
const stopCamera = async (req, res) => {
  cameraStatus = false;

  res.status(200).json({
    success: true,
    message: "Camera stopped",
  });
};

module.exports = {
  getCameraStatus,
  startCamera,
  stopCamera,
};