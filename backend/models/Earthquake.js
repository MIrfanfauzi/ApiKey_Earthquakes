const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Earthquake = sequelize.define('Earthquake', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tgl: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ot: {
        type: DataTypes.TIME,
        allowNull: true,
        comment: 'Origin Time'
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 6),
        allowNull: false
    },
    kedalaman_km: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Depth in kilometers'
    },
    magnitudo: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    type_magnitudo: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    wilayah: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Region/Province'
    },
    remark: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    provinsi: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    kota: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    dirasakan: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Felt intensity'
    },
    sumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'BMKG',
        comment: 'Data source (BMKG/USGS)'
    }
}, {
    tableName: 'earthquakes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            fields: ['tgl']
        },
        {
            fields: ['magnitudo']
        },
        {
            fields: ['wilayah']
        },
        {
            fields: ['provinsi']
        }
    ]
});

module.exports = Earthquake;
