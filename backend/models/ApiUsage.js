const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApiUsage = sequelize.define('ApiUsage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    api_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'api_users',
            key: 'id'
        }
    },
    endpoint: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    method: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    status_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    response_time_ms: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    user_agent: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'api_usage',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        {
            fields: ['api_user_id']
        },
        {
            fields: ['created_at']
        }
    ]
});

module.exports = ApiUsage;
