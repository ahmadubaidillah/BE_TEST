const {
  refactoreMe1,
  refactoreMe2,
} = require("../controllers/surveyController");

const {
  getData,
  callmeWebSocket,
} = require("../controllers/webSocketController");

const router = require("express").Router();

router.get("/survey", refactoreMe1);
router.post("/dosurvey", refactoreMe2);
router.get("/get", getData);
router.post("/post", callmeWebSocket);

module.exports = router;
