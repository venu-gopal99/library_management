const jwt = require('jsonwebtoken');

const librarianToken = function (id, boolean) {
    this.shopAdmin = boolean;
    this.id = id;
  };


  const generateLibrarianToken = function (id, boolean) {
    const adminTokenObject = new librarianToken(id, boolean);
    return jwt.sign({ adminTokenObject }, process.env.SECERT_STRING, {
      expiresIn: process.env.EXPIRE_DAYS,
    });
  };


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECERT_STRING, {
      expiresIn: process.env.EXPIRE_DAYS,
    });
  };




const sendUserToken = async (user, statusCode, res, message) => {
    const token = generateToken(user._id);
    const options = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
  
    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
  

  
    res.status(statusCode).json({ status: true, token, data: { user }, message });
  };

  const adminToken = async (user, statusCode, res) => {
    const token = generateLibrarianToken(user._id, true);
  
    res.status(statusCode).json({ status: "success", token, data: { user } });
  };

  module.exports={sendUserToken,adminToken}
