const router = require("express").Router();
const { authenticateUser, restrict } = require("../middleware/auth");
const orderController = require("../controller/orderController")

const {createOrder,getOrderOne,getAll,updateOrder,updateFine,getOrder,orderHistory,fineDetail}=new orderController();

router.route("/order-create").post(authenticateUser,createOrder);
router.route("/one-order/:id").get(authenticateUser,getOrderOne);
router.route("/history/:id").get(authenticateUser,orderHistory);
router.route("/finedetail/:id").get(authenticateUser,fineDetail);
router.route("/getorder").get(authenticateUser,restrict("librarian"),getOrder);
router.route("/get-all").get(authenticateUser,restrict("librarian"),getAll);
router.route("/update-order/:orderId").patch(authenticateUser,updateOrder);
router.route("/update-fine/:orderId").patch(authenticateUser,restrict("librarian"),updateFine)
module.exports=router;