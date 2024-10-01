const { DataTypes } = require("sequelize");
const { sequelize } = require("../mdbConnection");
const User = require("./User");

const UserCredits = sequelize.define(
  "UserCredits",
  {
    credit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
      unique: true,
      allowNull: false,
    },
    credits: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  },
  {
    timestamps: false,
    tableName: "user_credits",
  }
);

// Relationships
UserCredits.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = UserCredits;
