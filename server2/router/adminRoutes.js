const router = require("express").Router();
const adminController = require("../controller/adminController");

const{createAdmin,login}=new adminController();

router.route("/createadmin").post(createAdmin);
router.route("/loginadmin").post(login);

module.exports = router;