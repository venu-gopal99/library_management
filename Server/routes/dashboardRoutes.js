const router = require("express").Router();
const dashBoardController = require("../controller/dashBoardController");
const {createCount} = new dashBoardController();
router.route("/count").get(createCount);

module.exports = router;