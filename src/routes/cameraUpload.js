const express = require("express");
const router = express.Router();

let latestImage = null;
let lastUpdate = null;

// Upload Image
router.post(
  "/upload",
  express.raw({
    type: "image/jpeg",
    limit: "20mb",
  }),
  (req, res) => {
    console.log("📸 Upload request received");

    if (!req.body || req.body.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image received",
      });
    }

    latestImage = Buffer.from(req.body);
    lastUpdate = new Date();

    console.log(`✅ Image received: ${latestImage.length} bytes`);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      size: latestImage.length,
      time: lastUpdate,
    });
  }
);

// Latest Image
router.get("/latest", (req, res) => {
  if (!latestImage) {
    return res.status(404).send("No image available");
  }

  res.set("Content-Type", "image/jpeg");
  res.send(latestImage);
});

// Camera Status
router.get("/status", (req, res) => {
  res.json({
    online: latestImage !== null,
    lastUpdate,
  });
});

module.exports = router;