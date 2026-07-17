const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
    registerDevice,
    getMyDevices,
    getDeviceById,
    updateDevice,
    updateDeviceStatus,
    deleteDevice
} = require("../controllers/deviceController");

const {
    registerDeviceValidation,
    updateDeviceValidation
} = require("../validators/deviceValidator");

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Device Management APIs
 */

/**
 * @swagger
 * /api/device/register:
 *   post:
 *     summary: Register a new smart shoe device
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shoeName
 *               - esp32Mac
 *             properties:
 *               shoeName:
 *                 type: string
 *                 example: Smart Shoe
 *               esp32Mac:
 *                 type: string
 *                 example: AA:BB:CC:DD:EE:FF
 *     responses:
 *       201:
 *         description: Device registered successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/register",
    authMiddleware,
    registerDeviceValidation,
    validate,
    registerDevice
);

/**
 * @swagger
 * /api/device/my-devices:
 *   get:
 *     summary: Get all devices of logged-in user
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of registered devices
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/my-devices",
    authMiddleware,
    getMyDevices
);

/**
 * @swagger
 * /api/device/{deviceId}:
 *   get:
 *     summary: Get a single device by ID
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a5a7d58a7febf50641e0237
 *     responses:
 *       200:
 *         description: Device details
 *       404:
 *         description: Device not found
 */
router.get(
    "/:deviceId",
    authMiddleware,
    getDeviceById
);

/**
 * @swagger
 * /api/device/{deviceId}:
 *   put:
 *     summary: Update device information
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shoeName:
 *                 type: string
 *                 example: Updated Smart Shoe
 *               firmwareVersion:
 *                 type: string
 *                 example: v1.1.0
 *               gpsEnabled:
 *                 type: boolean
 *                 example: true
 *               cameraEnabled:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Device updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
    "/:deviceId",
    authMiddleware,
    updateDeviceValidation,
    validate,
    updateDevice
);

/**
 * @swagger
 * /api/device/status/{deviceId}:
 *   put:
 *     summary: Update device online/offline status
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device status updated successfully
 */
router.put(
    "/status/:deviceId",
    authMiddleware,
    updateDeviceStatus
);

/**
 * @swagger
 * /api/device/{deviceId}:
 *   delete:
 *     summary: Delete a device
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device deleted successfully
 *       404:
 *         description: Device not found
 */
router.delete(
    "/:deviceId",
    authMiddleware,
    deleteDevice
);

module.exports = router;