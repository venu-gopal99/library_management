const multer = require("multer");
const path = require("path");
const CustomError = require("../utils/customError");
const fs = require("fs");



const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + ".jpg");
    },
  });

  const uploadPhoto = multer({
    storage: multerStorage,
    limits: { fileSize: 2000000 },
  });

  module.exports = { uploadPhoto };