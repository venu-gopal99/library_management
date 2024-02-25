


const fs = require("fs").promises;
const path = require("path");

exports.uploadImages = async (req, res) => {
  const files = req?.files;
  const urls = files.map((file) => file.filename);
  res.status(200).json({ urls });
};


