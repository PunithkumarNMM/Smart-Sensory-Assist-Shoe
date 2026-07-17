const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboard,
} = require("../controllers/dashboardController");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/{deviceId}:
 *   get:
 *     summary: Get dashboard data
 *     description: Retrieve the complete dashboard information for a specific smart shoe device.
 *     tags: [Dashboard]
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
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Device not found
 */
router.get(
    "/:deviceId",
    authMiddleware,
    getDashboard
);

module.exports = router;