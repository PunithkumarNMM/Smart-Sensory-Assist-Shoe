const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
    fallEventValidation
} = require("../validators/fallValidator");

const {
    createFallEvent,
    getFallHistory
} = require("../controllers/fallController");

/**
 * @swagger
 * tags:
 *   name: Fall Detection
 *   description: Fall Detection APIs
 */

/**
 * @swagger
 * /api/fall/report:
 *   post:
 *     summary: Report a fall event
 *     description: Upload a detected fall event from a smart shoe device.
 *     tags: [Fall Detection]
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
 *               severity:
 *                 type: string
 *                 enum:
 *                   - Low
 *                   - Medium
 *                   - High
 *                 example: High
 *     responses:
 *       201:
 *         description: Fall event reported successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/report",
    authMiddleware,
    fallEventValidation,
    validate,
    createFallEvent
);

/**
 * @swagger
 * /api/fall/history/{deviceId}:
 *   get:
 *     summary: Get fall history
 *     description: Retrieve all recorded fall events for a specific device.
 *     tags: [Fall Detection]
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
 *         description: Fall history retrieved successfully
 *       404:
 *         description: Device not found
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/history/:deviceId",
    authMiddleware,
    getFallHistory
);

module.exports = router;