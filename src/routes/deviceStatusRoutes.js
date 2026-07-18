const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  updateDeviceStatus,
  getDeviceStatus,
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
 *     tags: [Device Status]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  authMiddleware,
  updateDeviceStatus
);

/**
 * @swagger
 * /api/device/status/{deviceId}:
 *   get:
 *     summary: Get current device status
 *     tags: [Device Status]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         example: SHOE-1784356643105
 *     responses:
 *       200:
 *         description: Device status fetched successfully
 *       404:
 *         description: Device not found
 */
router.get(
  "/:deviceId",
  authMiddleware,
  getDeviceStatus
);

module.exports = router;