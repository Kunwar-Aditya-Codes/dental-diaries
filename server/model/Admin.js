const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define(
  'Admin',
  {
    adminId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    adminName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    adminEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    adminPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'admins',
  }
);

module.exports = Admin;
