import express from "express";
import bodyParser from "body-parser";
import router from "./src/router/userRouter.js";

const port = 4000;
const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
