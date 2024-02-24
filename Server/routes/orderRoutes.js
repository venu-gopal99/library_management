const router = require("express").Router();
const { authenticateUser, restrict } = require("../middleware/auth");
const orderController = require("../controller/orderController")

const {createOrder,getOrderOne,getAll,updateOrder,updateFine}=new orderController();

router.route("/order-create").post(authenticateUser,createOrder);
router.route("/one-order").get(authenticateUser,getOrderOne);
router.route("/get-all").get(authenticateUser,restrict("librarian"),getAll);
router.route("/update-order/:orderId").patch(authenticateUser,updateOrder);
router.route("/update-fine/:orderId").patch(authenticateUser,updateFine)
module.exports=router;