const { ApiUsage } = require('../models');
const { Op } = require('sequelize');

/**
 * Rate limiting middleware
 * Limits requests to 100 calls per hour per API key
 * Returns 429 if quota exceeded
 */
const rateLimitMiddleware = async (req, res, next) => {
    try {
        const user = req.apiUser;

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'API key required for rate limiting'
            });
        }

        // Get rate limit settings
        const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 3600000; // 1 hour
        const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

        // Calculate time window
        const windowStart = new Date(Date.now() - windowMs);

        // Count requests in current window
        const requestCount = await ApiUsage.count({
            where: {
                api_user_id: user.id,
                created_at: {
                    [Op.gte]: windowStart
                }
            }
        });

        // Check tier-based quota
        let tierMaxRequests = maxRequests;
        if (user.tier === 'pro') {
            tierMaxRequests = 50000; // 50K per month (simplified to hour for demo)
        } else if (user.tier === 'enterprise') {
            tierMaxRequests = Infinity; // Unlimited
        }

        // Check if quota exceeded
        if (requestCount >= Math.min(maxRequests, tierMaxRequests)) {
            return res.status(429).json({
                error: 'Too Many Requests',
                message: `Rate limit exceeded. Maximum ${maxRequests} requests per hour for ${user.tier} tier.`,
                quota: {
                    limit: maxRequests,
                    used: requestCount,
                    remaining: 0,
                    reset: new Date(Date.now() + windowMs).toISOString()
                },
                upgrade: user.tier === 'free' ? 'Upgrade to Pro for 50K calls/month' : null
            });
        }

        // Add quota info to response headers
        res.setHeader('X-RateLimit-Limit', maxRequests);
        res.setHeader('X-RateLimit-Remaining', maxRequests - requestCount - 1);
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + windowMs).toISOString());

        // Track this request
        req.trackUsage = true;
        req.requestStartTime = Date.now();

        next();
    } catch (error) {
        console.error('Rate limit middleware error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error checking rate limit'
        });
    }
};

/**
 * Middleware to log API usage after response
 */
const logApiUsage = async (req, res, next) => {
    const originalSend = res.send;

    res.send = function (data) {
        res.send = originalSend;

        // Log usage asynchronously
        if (req.trackUsage && req.apiUser) {
            const responseTime = Date.now() - req.requestStartTime;

            ApiUsage.create({
                api_user_id: req.apiUser.id,
                endpoint: req.path,
                method: req.method,
                status_code: res.statusCode,
                response_time_ms: responseTime,
                ip_address: req.ip || req.connection.remoteAddress,
                user_agent: req.headers['user-agent']
            }).catch(err => console.error('Error logging API usage:', err));

            // Update user stats
            req.apiUser.increment('calls_today');
            req.apiUser.increment('total_calls');
            req.apiUser.update({ last_used: new Date() });
        }

        return originalSend.call(this, data);
    };

    next();
};

module.exports = {
    rateLimitMiddleware,
    logApiUsage
};
