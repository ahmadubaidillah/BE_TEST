// // const { exampleMiddleware } = require("../middleware");
// // const exampleController = require("../controllers/exampleController");
// const { refactoreMe1 } = require("../controllers/surveyController.js");

// module.exports = (app) => {
//   app.use((req, res, next) => {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   const router = require("express").Router();

//   router.get("/refactoreMe1", refactoreMe1);

//   router.get(
//     "/",
//     [exampleMiddleware.exampleMiddleware],
//     exampleController.exampleFunction
//   );

//   router.get(
//     "/",
//     [exampleMiddleware.exampleMiddleware],
//     exampleController.exampleFunction
//   );

//   app.use("/api/data", router);
// };
