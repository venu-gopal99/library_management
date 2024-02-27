const BookController = require("../controller/bookController");
const router = require("express").Router();
const { authenticateUser, restrict } = require("../middleware/auth");
const { uploadPhoto } = require("../middleware/multer");

const { createBook, getAllBooks, deleteBook, updateBook,getOne } =
  new BookController();

router.route("/createbook").post(authenticateUser,restrict("librarian"),uploadPhoto.array("images", 1), createBook);
router.route("/getall").get(getAllBooks);
router
  .route("/updatebook/:id")
  .patch(authenticateUser,restrict("librarian"),updateBook);
router
  .route("/deletebook/:id")
  .delete(authenticateUser, restrict("librarian", deleteBook));
router
.route("/bookone/:id").get(authenticateUser,restrict("librarian"),getOne)

module.exports = router;
