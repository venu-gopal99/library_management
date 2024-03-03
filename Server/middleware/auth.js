const jwt = require("jsonwebtoken");
const util = require("util");
const studentModel = require("../model/studentModel");
const CustomError = require("../utils/customError");
const adminModel = require("../model/adminModel")

const authenticateUser = async(req,res,next)=>{
    const testToken = req.headers.authorization;
    let token;
    const secretKey = process.env.SECRET_STRING || 'fallback-secret';
    if(testToken&&testToken.startsWith("Bearer")){
        token = testToken.split(" ")[1];
    }
     console.log(token,"token")
    if(!token){
        const error = new CustomError("you are not logged in", 401);
     return next(error)
    }
    const decodedToken = await util.promisify(jwt.verify)(
        token,
        secretKey
      );
      // console.log(token,"token")
      let user;
       if(decodedToken.adminTokenObject){
          user = await adminModel.findById(decodedToken.adminTokenObject.id)
          // console.log(decodedToken.adminTokenObject.id,"admin")
       }else{
        user = await studentModel.findById(decodedToken.id);
       }
      
      //  console.log(user,"user")
    if(!user){
        const error = new CustomError(
            "The user with given token does not exist",
            401
          );
          return next(error);
    }

    // req.student = user.student_ID
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