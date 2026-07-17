const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getCameraStatus,
    startCamera,
    stopCamera,
} = require("../controllers/cameraController");

/**
 * @swagger
 * tags:
 *   name: Camera
 *   description: Camera Control APIs
 */

/**
 * @swagger
 * /api/camera/status:
 *   get:
 *     summary: Get camera status
 *     description: Returns the current status of the smart shoe camera.
 *     tags: [Camera]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Camera status retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/status",
    authMiddleware,
    getCameraStatus
);

/**
 * @swagger
 * /api/camera/start:
 *   post:
 *     summary: Start camera
 *     description: Starts the smart shoe camera for monitoring or live streaming.
 *     tags: [Camera]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Camera started successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/start",
    authMiddleware,
    startCamera
);

/**
 * @swagger
 * /api/camera/stop:
 *   post:
 *     summary: Stop camera
 *     description: Stops the smart shoe camera.
 *     tags: [Camera]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Camera stopped successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/stop",
    authMiddleware,
    stopCamera
);

module.exports = router;