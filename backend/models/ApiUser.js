const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApiUser = sequelize.define('ApiUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    company: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    use_case: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    api_key: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    calls_today: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_calls: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    quota: {
        type: DataTypes.INTEGER,
        defaultValue: 1000
    },
    tier: {
        type: DataTypes.ENUM('free', 'pro', 'enterprise'),
        defaultValue: 'free'
    },
    last_used: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'api_users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = ApiUser;
