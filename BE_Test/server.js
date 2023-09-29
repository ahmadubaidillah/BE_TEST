const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./app/routes/route");
const db = require("./app/config/db");
const Surveys = require("./app/models/surveyModel");
const Users = require("./app/models/userModel");
const Attack = require("./app/models/attackModel");
dotenv.config();
const app = express();

const corsOptions = {
  origin: ["http://localhost:8080"],
};

try {
  db.authenticate();
  // Surveys.sync();
  Attack.sync();
  // Users.sync();
  console.log("Database Connected...");
  // db.sync(); //untuk jika tidak ada tabel maka akan menggenerate tabel otomatis
  // await Users.sync(); //jika sudah ada tabel tidak perlu digunakan
} catch (error) {
  console.log(error);
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// database
// const db = require("./app/models");

// db.sequelize.sync();

// never enable the code below in production
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   // initial();
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello" });
// });

// routes
// require("./app/routes/exaole.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
