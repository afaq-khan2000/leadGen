const { DataTypes } = require("sequelize");
const { sequelize } = require("../mdbConnection");
const CarBrand = require("./CarBrand");

const Lead = sequelize.define(
  "Lead",
  {
    lead_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    car_brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: CarBrand,
        key: "car_brand_id",
      },
    },
    car_model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lead_time: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_unlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    credits_required: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "leads_final",
  }
);

// Relationships
Lead.belongsTo(CarBrand, { foreignKey: "car_brand_id", as: "car_brand_relationship" });

module.exports = Lead;
