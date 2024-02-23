const studentController = require("../controller/studentController")
const { authenticateUser, restrict } = require("../middleware/auth");
const router = require("express").Router();
const {
    createStudent,
    login,
    getAllStudent
}=new studentController();

router.route("/createuser").post(createStudent);
router.route("/loginuser").post(login);
router.route("/getall").get(authenticateUser,restrict("librarian"),getAllStudent)

module.exports = router;