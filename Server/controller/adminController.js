const adminModel = require("../model/adminModel")
const { adminToken } = require("../utils/jwtToken")
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");


class adminController {

  createAdmin = async (req, res, next) => {
    try {
      const usermail = await adminModel.findOne({ admin_mail: req.body.admin_mail })
      if (usermail) {
        return next(new CustomError("mail is already exists", 409))

      }
      let user = await adminModel.create(req.body)

      user = {
        _id: user._id,
        name: user.admin_name,
        email: user.admin_mail
      };

      adminToken(user, 201, res, { message: "registered successfully" })
    } catch (error) {
      return next(new CustomError(error.message, 400));

    }
  };

  adminLogin = async (req, res, next) => {
    try {
      const { admin_mail, admin_password } = req.body;
      if (!admin_mail && !admin_password) {
        const error = new CustomError("please provide  email & password for login", 400)
        return next(error);
      }
      let user = await adminModel.findOne({ admin_mail }).select("+admin_password");

      if (!user) {
        const error = new CustomError("user is not found", 404);
        return next(error)
      };
      const isMatch = await user.comparePasswordInDb(
        admin_password, user.admin_password);

      if (!isMatch) {
        const error = new CustomError("passowrd is incorrect", 400);
        return next(error)
      }
      user = {
        _id: user._id,
        email: user.admin_mail,
       
      };
      adminToken(user, 200, res, { message: "Login successfull" });

    } catch (error) {
      return next(new CustomError(error.message, 500));

    }
  };




};

module.exports = adminController