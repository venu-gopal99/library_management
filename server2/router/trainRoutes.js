const router = require("express").Router();
const trainController = require("../controller/trainController");

const{createTrain,getAll,getOne}=new trainController();

router.route("/createtrain").post(createTrain);
router.route("/getall").get(getAll);
router.route("/getone/:id").get(getOne);

module.exports = router;