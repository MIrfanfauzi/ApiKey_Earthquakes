const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Earthquake } = require('../models');
const { authenticateApiKey } = require('../middleware/auth');
const { rateLimitMiddleware, logApiUsage } = require('../middleware/rateLimit');

// Apply authentication and rate limiting to all routes
router.use(authenticateApiKey);
router.use(logApiUsage);
router.use(rateLimitMiddleware);

/**
 * @swagger
 * /api/earthquakes:
 *   get:
 *     summary: Get earthquakes with filters
 *     description: Retrieve earthquake data with optional filtering by magnitude, date, province, etc.
 *     tags: [Earthquakes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results to return (max 100)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip
 *       - in: query
 *         name: mag_min
 *         schema:
 *           type: number
 *         description: Minimum magnitude
 *       - in: query
 *         name: mag_max
 *         schema:
 *           type: number
 *         description: Maximum magnitude
 *       - in: query
 *         name: date_from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: date_to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: Filter by province name (partial match)
 *       - in: query
 *         name: wilayah
 *         schema:
 *           type: string
 *         description: Filter by region name (partial match)
 *     responses:
 *       200:
 *         description: List of earthquakes
 *       401:
 *         description: Unauthorized - Invalid or missing API key
 *       429:
 *         description: Too Many Requests - Rate limit exceeded
 */
router.get('/', async (req, res) => {
    try {
        const {
            limit = 10,
            offset = 0,
            mag_min,
            mag_max,
            date_from,
            date_to,
            province,
            wilayah,
            sort_by = 'tgl',
            order = 'DESC'
        } = req.query;

        // Build where clause
        const where = {};

        if (mag_min) {
            where.magnitudo = { ...where.magnitudo, [Op.gte]: parseFloat(mag_min) };
        }
        if (mag_max) {
            where.magnitudo = { ...where.magnitudo, [Op.lte]: parseFloat(mag_max) };
        }
        if (date_from) {
            where.tgl = { ...where.tgl, [Op.gte]: date_from };
        }
        if (date_to) {
            where.tgl = { ...where.tgl, [Op.lte]: date_to };
        }
        if (province) {
            where.provinsi = { [Op.like]: `%${province}%` };
        }
        if (wilayah) {
            where.wilayah = { [Op.like]: `%${wilayah}%` };
        }

        // Validate limit
        const parsedLimit = Math.min(parseInt(limit), 100);
        const parsedOffset = parseInt(offset);

        // Query earthquakes
        const { count, rows } = await Earthquake.findAndCountAll({
            where,
            limit: parsedLimit,
            offset: parsedOffset,
            order: [[sort_by, order.toUpperCase()]],
            attributes: { exclude: ['created_at', 'updated_at'] }
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                limit: parsedLimit,
                offset: parsedOffset,
                returned: rows.length
            },
            filters: {
                mag_min,
                mag_max,
                date_from,
                date_to,
                province,
                wilayah
            }
        });
    } catch (error) {
        console.error('Get earthquakes error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve earthquake data'
        });
    }
});

/**
 * @swagger
 * /api/earthquakes/realtime:
 *   get:
 *     summary: Get latest earthquakes
 *     description: Get the most recent earthquake events
 *     tags: [Earthquakes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of results (max 100)
 *     responses:
 *       200:
 *         description: Latest earthquakes
 */
router.get('/realtime', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);

        const earthquakes = await Earthquake.findAll({
            limit,
            order: [['tgl', 'DESC'], ['id', 'DESC']],
            attributes: { exclude: ['created_at', 'updated_at'] }
        });

        res.json({
            success: true,
            data: earthquakes,
            count: earthquakes.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Get realtime earthquakes error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve realtime earthquake data'
        });
    }
});

/**
 * @swagger
 * /api/earthquakes/{id}:
 *   get:
 *     summary: Get earthquake by ID
 *     description: Retrieve detailed information about a specific earthquake
 *     tags: [Earthquakes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Earthquake ID
 *     responses:
 *       200:
 *         description: Earthquake details
 *       404:
 *         description: Earthquake not found
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const earthquake = await Earthquake.findByPk(id, {
            attributes: { exclude: ['created_at', 'updated_at'] }
        });

        if (!earthquake) {
            return res.status(404).json({
                error: 'Not Found',
                message: `Earthquake with ID ${id} not found`
            });
        }

        res.json({
            success: true,
            data: earthquake
        });
    } catch (error) {
        console.error('Get earthquake by ID error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve earthquake data'
        });
    }
});

/**
 * @swagger
 * /api/earthquakes/stats/provinces:
 *   get:
 *     summary: Get earthquake statistics by province
 *     description: Get aggregated earthquake data grouped by province
 *     tags: [Statistics]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Province statistics
 */
router.get('/stats/provinces', async (req, res) => {
    try {
        const stats = await Earthquake.findAll({
            attributes: [
                'provinsi',
                [Earthquake.sequelize.fn('COUNT', Earthquake.sequelize.col('id')), 'total_earthquakes'],
                [Earthquake.sequelize.fn('AVG', Earthquake.sequelize.col('magnitudo')), 'avg_magnitude'],
                [Earthquake.sequelize.fn('MAX', Earthquake.sequelize.col('magnitudo')), 'max_magnitude'],
                [Earthquake.sequelize.fn('MIN', Earthquake.sequelize.col('magnitudo')), 'min_magnitude']
            ],
            where: {
                provinsi: { [Op.ne]: null }
            },
            group: ['provinsi'],
            order: [[Earthquake.sequelize.fn('COUNT', Earthquake.sequelize.col('id')), 'DESC']]
        });

        res.json({
            success: true,
            data: stats,
            count: stats.length
        });
    } catch (error) {
        console.error('Get province stats error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve province statistics'
        });
    }
});

module.exports = router;
