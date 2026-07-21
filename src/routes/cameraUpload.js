const express = require("express");
const router = express.Router();

let latestImage = null;

router.post(
  "/upload",
  express.raw({ type: "image/jpeg", limit: "10mb" }),
  (req, res) => {
    latestImage = req.body;
    res.json({ success: true });
  }
);

router.get("/latest", (req, res) => {
  if (!latestImage) {
    return res.status(404).send("No image available");
  }

  res.set("Content-Type", "image/jpeg");
  res.send(latestImage);
});

module.exports = router;