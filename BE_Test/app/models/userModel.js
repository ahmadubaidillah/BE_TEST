const db = require("../config/db");
const { Sequelize } = require("sequelize");

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    digits: {
      type: DataTypes.STRING(155),
      allowNull: true,
      unique: true,
    },
    fotoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    workType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    positionTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING(155),
      allowNull: true,
    },
    isLogin: {
      type: DataTypes.BOOLEAN,
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
    dovote: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dosurvey: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dofeedback: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cuurentLeave: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

module.exports = Users;
