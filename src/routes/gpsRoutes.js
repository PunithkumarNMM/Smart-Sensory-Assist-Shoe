const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
    uploadGPSValidation
} = require("../validators/gpsValidator");

const {
    updateLocation,
    getLiveLocation,
    getLocationHistory
} = require("../controllers/gpsController");

/**
 * @swagger
 * tags:
 *   name: GPS
 *   description: GPS Tracking APIs
 */

/**
 * @swagger
 * /api/gps/update:
 *   post:
 *     summary: Upload device GPS location
 *     tags: [GPS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deviceId
 *               - latitude
 *               - longitude
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: 6a5a7d58a7febf50641e0237
 *               latitude:
 *                 type: number
 *                 example: 12.9716
 *               longitude:
 *                 type: number
 *                 example: 77.5946
 *     responses:
 *       201:
 *         description: GPS location uploaded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/update",
    authMiddleware,
    uploadGPSValidation,
    validate,
    updateLocation
);

/**
 * @swagger
 * /api/gps/live/{deviceId}:
 *   get:
 *     summary: Get live GPS location of a device
 *     tags: [GPS]
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
 *         description: Live location retrieved successfully
 *       404:
 *         description: Device not found
 */
router.get(
    "/live/:deviceId",
    authMiddleware,
    getLiveLocation
);

/**
 * @swagger
 * /api/gps/history/{deviceId}:
 *   get:
 *     summary: Get GPS location history of a device
 *     tags: [GPS]
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
 *         description: GPS history retrieved successfully
 *       404:
 *         description: Device not found
 */
router.get(
    "/history/:deviceId",
    authMiddleware,
    getLocationHistory
);

module.exports = router;