const express = require("express");
const router = express.Router();

let latestFrame = null;
let lastUpdate = 0;

/*
====================================
UPLOAD FRAME FROM ESP32
====================================
*/

router.post(
    "/upload",
    express.raw({
        type: "image/jpeg",
        limit: "20mb"
    }),
    (req, res) => {
        console.log(">>> Upload request received");

        if (!req.body || req.body.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No image received"
            });
        }

        latestFrame = req.body;
        lastUpdate = Date.now();

        console.log(
            "Frame Received:",
            latestFrame.length,
            "bytes"
        );

        res.json({
            success: true,
            time: lastUpdate
        });

    }
);

/*
====================================
LIVE CAMERA
====================================
*/

router.get("/latest", (req, res) => {

    if (!latestFrame) {

        return res.status(404).send("No image available");

    }

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Pragma", "no-cache");
    res.send(latestFrame);

});

/*
====================================
CAMERA STATUS
====================================
*/

router.get("/status", (req, res) => {

    const online =
        Date.now() - lastUpdate < 10000;

    res.json({

        online,

        lastUpdate

    });

});

/*
====================================
CAPTURE
====================================
*/

router.get("/capture", (req, res) => {

    if (!latestFrame) {

        return res.status(404).json({

            success: false,

            message: "No image"

        });

    }

    res.setHeader(
        "Content-Type",
        "image/jpeg"
    );

    res.send(latestFrame);

});

module.exports = router;