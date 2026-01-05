const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { ApiUser, ApiUsage, Earthquake } = require('../models');
const { authenticateApiKey } = require('../middleware/auth');

// Apply authentication to all dashboard routes
router.use(authenticateApiKey);

/**
 * @swagger
 * /api/dashboard/usage:
 *   get:
 *     summary: Get API usage statistics
 *     description: Retrieve usage statistics for the authenticated API key
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Usage statistics
 */
router.get('/usage', async (req, res) => {
    try {
        const user = req.apiUser;

        // Get usage for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const usageByDay = await ApiUsage.findAll({
            attributes: [
                [ApiUsage.sequelize.fn('DATE', ApiUsage.sequelize.col('created_at')), 'date'],
                [ApiUsage.sequelize.fn('COUNT', ApiUsage.sequelize.col('id')), 'calls']
            ],
            where: {
                api_user_id: user.id,
                created_at: {
                    [Op.gte]: thirtyDaysAgo
                }
            },
            group: [ApiUsage.sequelize.fn('DATE', ApiUsage.sequelize.col('created_at'))],
            order: [[ApiUsage.sequelize.fn('DATE', ApiUsage.sequelize.col('created_at')), 'ASC']],
            raw: true
        });

        // Get total usage
        const totalUsage = await ApiUsage.count({
            where: { api_user_id: user.id }
        });

        // Get usage today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const usageToday = await ApiUsage.count({
            where: {
                api_user_id: user.id,
                created_at: {
                    [Op.gte]: today
                }
            }
        });

        // Get most used endpoints
        const topEndpoints = await ApiUsage.findAll({
            attributes: [
                'endpoint',
                [ApiUsage.sequelize.fn('COUNT', ApiUsage.sequelize.col('id')), 'calls']
            ],
            where: { api_user_id: user.id },
            group: ['endpoint'],
            order: [[ApiUsage.sequelize.fn('COUNT', ApiUsage.sequelize.col('id')), 'DESC']],
            limit: 5,
            raw: true
        });

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                tier: user.tier,
                api_key: user.api_key
            },
            quota: {
                limit: user.quota,
                used_today: usageToday,
                remaining: Math.max(0, user.quota - usageToday),
                total_calls: totalUsage
            },
            usage_by_day: usageByDay,
            top_endpoints: topEndpoints,
            last_used: user.last_used
        });
    } catch (error) {
        console.error('Get usage error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve usage statistics'
        });
    }
});

/**
 * @swagger
 * /api/dashboard/recent-earthquakes:
 *   get:
 *     summary: Get recent strong earthquakes
 *     description: Get the strongest earthquakes from the last 7 days for dashboard map
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Recent strong earthquakes
 */
router.get('/recent-earthquakes', async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const earthquakes = await Earthquake.findAll({
            where: {
                tgl: {
                    [Op.gte]: sevenDaysAgo
                },
                magnitudo: {
                    [Op.gte]: 4.0
                }
            },
            order: [['magnitudo', 'DESC']],
            limit: 20,
            attributes: ['id', 'tgl', 'latitude', 'longitude', 'magnitudo', 'wilayah', 'kedalaman_km']
        });

        res.json({
            success: true,
            data: earthquakes,
            count: earthquakes.length
        });
    } catch (error) {
        console.error('Get recent earthquakes error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve recent earthquakes'
        });
    }
});

/**
 * @swagger
 * /api/dashboard/regenerate-key:
 *   post:
 *     summary: Regenerate API key
 *     description: Generate a new API key (old key will be invalidated)
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: New API key generated
 */
router.post('/regenerate-key', async (req, res) => {
    try {
        const user = req.apiUser;
        const { generateApiKey } = require('../utils/apiKeyGenerator');

        const newApiKey = generateApiKey();

        await user.update({
            api_key: newApiKey
        });

        res.json({
            success: true,
            message: 'API key regenerated successfully',
            api_key: newApiKey,
            note: 'Your old API key has been invalidated. Please update your applications with the new key.'
        });
    } catch (error) {
        console.error('Regenerate key error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to regenerate API key'
        });
    }
});

module.exports = router;
