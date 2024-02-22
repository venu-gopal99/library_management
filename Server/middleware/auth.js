const jwt = require("jsonwebtoken");
const util = require("util");
const studentModel = require("../model/studentModel");
const CustomError = require("../utils/customError");


const authenticateUser = async(req,res,next)=>{
    const testToken = req.headers.authorization;
    let token;

    if(testToken&&testToken.startsWith("Bearer")){
        token = testToken.split(" ")[1];
    }

    if(!token){
        const error = new CustomError("you are not logged in", 401);
     return next(error)
    }
    const decodedToken = await util.promisify(jwt.verify)(
        token,
        process.env.SECERT_STRING
      );

      let user;

      user = await studentModel.findById(decodedToken.id);

    if(!user){
        const error = new CustomError(
            "The user with given token does not exist",
            401
          );
          return next(error);
    }


    req.user = user;
    next();
};
const restrict = (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.user.role)) {
        const error = new CustomError(
          "you don't have permission to perform this action",
          403
        );
        return next(error);
      }
      next();
    };
  };

module.exports={authenticateUser,restrict}