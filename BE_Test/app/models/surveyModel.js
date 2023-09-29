const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Surveys = db.define(
  "surveys",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    values: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assuming "values" is an array of integers
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal("CURRENT_TIMESTAMP"),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    // timestamps: false,
  }
);

module.exports = Surveys;
