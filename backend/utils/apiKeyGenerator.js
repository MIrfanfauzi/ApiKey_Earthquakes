const crypto = require('crypto');

/**
 * Generate a secure API key with format: sk_eq_id_xxxxx
 * @returns {string} Generated API key
 */
function generateApiKey() {
    const prefix = process.env.API_KEY_PREFIX || 'sk_eq_id_';
    const randomBytes = crypto.randomBytes(24).toString('hex');
    return `${prefix}${randomBytes}`;
}

/**
 * Validate API key format
 * @param {string} apiKey - API key to validate
 * @returns {boolean} True if valid format
 */
function validateApiKeyFormat(apiKey) {
    const prefix = process.env.API_KEY_PREFIX || 'sk_eq_id_';
    const pattern = new RegExp(`^${prefix}[a-f0-9]{48}$`);
    return pattern.test(apiKey);
}

module.exports = {
    generateApiKey,
    validateApiKeyFormat
};
