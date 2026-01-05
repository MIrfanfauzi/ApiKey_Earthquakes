const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { ApiUser } = require('../models');
const { generateApiKey } = require('../utils/apiKeyGenerator');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register and get API key
 *     description: Register a new user and receive an API key for accessing the earthquake data
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               company:
 *                 type: string
 *                 example: Tech Corp
 *               use_case:
 *                 type: string
 *                 example: Building earthquake monitoring dashboard
 *     responses:
 *       201:
 *         description: API key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 api_key:
 *                   type: string
 *                 quota:
 *                   type: integer
 *                 tier:
 *                   type: string
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already registered
 */
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().notEmpty().isLength({ min: 2, max: 255 }),
    body('company').optional().trim().isLength({ max: 255 }),
    body('use_case').optional().trim()
], async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                details: errors.array()
            });
        }

        const { email, name, company, use_case } = req.body;

        // Check if email already exists
        const existingUser = await ApiUser.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                error: 'Conflict',
                message: 'Email already registered. Please use a different email or retrieve your existing API key.'
            });
        }

        // Generate API key
        const apiKey = generateApiKey();

        // Create user
        const user = await ApiUser.create({
            email,
            name,
            company,
            use_case,
            api_key: apiKey,
            quota: 1000,
            tier: 'free'
        });

        res.status(201).json({
            message: 'API key generated successfully',
            api_key: apiKey,
            quota: user.quota,
            tier: user.tier,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            documentation: '/api-docs',
            note: 'Please save your API key securely. You will need it for all API requests.'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to register user'
        });
    }
});

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify API key
 *     description: Check if an API key is valid and get user information
 *     tags: [Authentication]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: API key is valid
 *       401:
 *         description: Invalid API key
 */
router.get('/verify', async (req, res) => {
    try {
        const apiKey = req.headers['api-key'] || req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'API key is required'
            });
        }

        const user = await ApiUser.findOne({
            where: { api_key: apiKey, is_active: true },
            attributes: ['id', 'email', 'name', 'tier', 'quota', 'calls_today', 'total_calls', 'last_used']
        });

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid API key'
            });
        }

        res.json({
            valid: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                tier: user.tier,
                quota: user.quota,
                calls_today: user.calls_today,
                total_calls: user.total_calls,
                last_used: user.last_used
            }
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to verify API key'
        });
    }
});

module.exports = router;
