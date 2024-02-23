const jwt = require('jsonwebtoken');
require('dotenv').config();

const librarianToken = function (id, boolean) {
    this.libraryAdmin = boolean;
    this.id = id;
  };


  const generateLibrarianToken = function (id, boolean) {
    const adminTokenObject = new librarianToken(id, boolean);
  const secretKey = process.env.SECRET_STRING || 'fallback-secret';

    return jwt.sign({ adminTokenObject }, secretKey, {
      expiresIn: process.env.EXPIRE_DAYS,
    });
  };


const generateToken = (id) => {
  const secretKey = process.env.SECRET_STRING || 'fallback-secret';
    return jwt.sign({ id }, secretKey, {
      expiresIn: process.env.EXPIRE_DAYS,
    });
  };




const sendUserToken = async (user, statusCode, res, message) => {
    const token = generateToken(user._id);
     console.log(user,"user")

  
    res.status(statusCode).json({ status: true, token, data: { user }, message });
  };

  const adminToken = async (user, statusCode, res,message) => {
    const token = generateLibrarianToken(user._id, true);
  
    res.status(statusCode).json({ status: "success", token, data: { user },message });
  };

  module.exports={sendUserToken,adminToken}
