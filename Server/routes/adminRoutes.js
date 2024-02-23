const { authenticateUser, restrict } = require("../middleware/auth");
const router = require("express").Router();
const adminController = require("../controller/adminController")

const  {
    createAdmin,
    adminLogin
}= new adminController();

router.route("/admincreate").post(createAdmin)
router.route("/loginadmin").post(adminLogin)

module.exports = router;
