const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Attack = db.define(
  "attack",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    destinationCountry: {
      type: DataTypes.STRING(255), // Adjust the length as needed
      allowNull: false,
    },
    sourceCountry: {
      type: DataTypes.STRING(255), // Adjust the length as needed
      allowNull: false,
    },
    attackType: {
      type: DataTypes.STRING(100), // Adjust the length as needed
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = Attack;
