const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

// module.exports = {
//   HOST: process.env.HOST,
//   USER: process.env.USER,
//   PASSWORD: process.env.PASSWORD,
//   DB: process.env.DB,
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

const db = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = db;
