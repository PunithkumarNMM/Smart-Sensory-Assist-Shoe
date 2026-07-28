const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/detect", authMiddleware, async (req, res) => {

    const { prediction, confidence } = req.body;

    let emergency = false;

    if (
        prediction === "fall" &&
        confidence >= 0.80
    ) {
        emergency = true;
    }

    res.json({
        success: true,
        prediction,
        confidence,
        emergency
    });

});

module.exports = router;