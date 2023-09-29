// const config = require("../config/db");
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//   host: config.HOST,
//   dialect: config.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: config.pool.max,
//     min: config.pool.min,
//     acquire: config.pool.acquire,
//     idle: config.pool.idle,
//   },
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // try {
// //   db.authenticate();
// //   console.log("Database Connected...");
// //   db.sync(); //untuk jika tidak ada tabel maka akan menggenerate tabel otomatis
// //   // await Users.sync(); //jika sudah ada tabel tidak perlu digunakan
// // } catch (error) {
// //   console.log(error);
// // }

// // module.exports = db;

// // const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
// //   host: config.HOST,
// //   dialect: config.dialect,
// //   operatorsAliases: false,

// //   pool: {
// //     max: config.pool.max,
// //     min: config.pool.min,
// //     acquire: config.pool.acquire,
// //     idle: config.pool.idle,
// //   },
// // });

// // const db = {};

// // db.Sequelize = Sequelize;
// // db.sequelize = sequelize;

// // // define model example
// // db.Surveys = require("../models/surveyModel")(sequelize, Sequelize);

// // // relation example
// // // relation between role and user
// // // db.role.hasMany(db.user, {
// // //   as: "users",
// // //   onDelete: "cascade",
// // //   onUpdate: "cascade",
// // // });

// // // db.user.belongsTo(db.role, {
// // //   foreignKey: "roleId",
// // //   as: "role",
// // // });

// module.exports = db;
