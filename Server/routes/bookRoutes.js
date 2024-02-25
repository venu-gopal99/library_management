const BookController = require("../controller/bookController");
const router = require("express").Router();
const { authenticateUser, restrict } = require("../middleware/auth");
const { uploadPhoto } = require("../middleware/multer");

const { createBook, getAllBooks, deleteBook, updateBook } =
  new BookController();

router.route("/createbook").post(authenticateUser,uploadPhoto.array("images", 1), createBook);
router.route("/getall").get(getAllBooks);
router
  .route("/updatebook/:id")
  .patch(authenticateUser, restrict("librarian"), updateBook);
router
  .route("/deletebook/:id")
  .delete(authenticateUser, restrict("librarian", deleteBook));

module.exports = router;
