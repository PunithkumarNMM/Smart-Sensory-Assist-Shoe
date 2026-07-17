const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    updateDeviceStatus,
} = require("../controllers/deviceStatusController");

/**
 * @swagger
 * tags:
 *   name: Device Status
 *   description: Device Status Management APIs
 */

/**
 * @swagger
 * /api/device/status:
 *   post:
 *     summary: Update device status
 *     description: Update the online/offline status, battery level, or other runtime status of a smart shoe device.
 *     tags: [Device Status]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: 6a5a7d58a7febf50641e0237
 *               isOnline:
 *                 type: boolean
 *                 example: true
 *               batteryLevel:
 *                 type: integer
 *                 example: 85
 *     responses:
 *       200:
 *         description: Device status updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    authMiddleware,
    updateDeviceStatus
);

module.exports = router;