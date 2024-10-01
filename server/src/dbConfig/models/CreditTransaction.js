const { DataTypes } = require("sequelize");
const { sequelize } = require("../mdbConnection");
const User = require("./User");

const CreditTransaction = sequelize.define(
  "CreditTransaction",
  {
    transaction_id: {
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
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "credit_transactions",
  }
);

// Relationships
CreditTransaction.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = CreditTransaction;
