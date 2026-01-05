const sequelize = require('../config/database');
const ApiUser = require('./ApiUser');
const Earthquake = require('./Earthquake');
const ApiUsage = require('./ApiUsage');

// Define associations
ApiUser.hasMany(ApiUsage, {
    foreignKey: 'api_user_id',
    as: 'usages'
});

ApiUsage.belongsTo(ApiUser, {
    foreignKey: 'api_user_id',
    as: 'user'
});

// Sync models (use migrations in production)
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log('✅ Database models synchronized');
    } catch (error) {
        console.error('❌ Error synchronizing database:', error);
    }
};

module.exports = {
    sequelize,
    ApiUser,
    Earthquake,
    ApiUsage,
    syncDatabase
};
