const { ApiUser } = require('../models');

/**
 * Middleware to validate API key
 * Returns 401 if no API key is provided or invalid
 */
const authenticateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['api-key'] || req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'API key is required. Please provide an API key in the "api-key" header.',
                documentation: '/api-docs'
            });
        }

        // Find user by API key
        const user = await ApiUser.findOne({
            where: {
                api_key: apiKey,
                is_active: true
            }
        });

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid API key. Please check your API key or register for a new one.',
                documentation: '/api-docs'
            });
        }

        // Attach user to request
        req.apiUser = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error validating API key'
        });
    }
};

module.exports = {
    authenticateApiKey
};
