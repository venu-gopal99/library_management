module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { uploadImages } = require("../controller/uploadController");
  const { authenticateUser } = require("../middleware/auth");
  // const {protect,restrict}
 
  const { uploadPhoto } = require("../middleware/multer");
  
  router.route("/banner-upload").post(uploadPhoto.array("images", 1), uploadImages);
  app.use("/api/upload", router);
};
