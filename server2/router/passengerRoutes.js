const router = require("express").Router();
const passengerController = require("../controller/passengerController");

const {
    createPassenger,login
}=new passengerController();

router.route("/createuser").post(createPassenger);
router.route("/login").post(login);

module.exports=router;