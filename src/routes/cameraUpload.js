const express = require("express");

const router = express.Router();

let latestImage = null;

// Receive image from ESP32
router.post("/upload", express.raw({ type: "image/jpeg", limit: "10mb" }), (req, res) => {

    latestImage = req.body;

    console.log("Image received:", latestImage.length, "bytes");

    res.json({
        success: true
    });

});

// Android fetches latest image
router.get("/latest", (req, res) => {

    if (!latestImage) {
        return res.status(404).send("No image available");
    }

    res.set("Content-Type", "image/jpeg");
    res.send(latestImage);

});

module.exports = router;