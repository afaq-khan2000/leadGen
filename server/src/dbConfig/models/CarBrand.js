const { DataTypes } = require("sequelize");
const { sequelize } = require("../mdbConnection");

const CarBrand = sequelize.define(
  "CarBrand",
  {
    car_brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    car_brand_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    credits_required: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "car_brands",
  }
);

module.exports = CarBrand;
