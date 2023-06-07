const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const HealthForm = sequelize.define(
  "HealthForm",
  {
    formId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "userId",
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    formStatus: {
      type: DataTypes.ENUM("pending", "completed", "rejected", "approved"),
      allowNull: false,
      defaultValue: "pending",
    },

    formDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "healthForms",
    timestamps: true,
  }
);

module.exports = HealthForm;
