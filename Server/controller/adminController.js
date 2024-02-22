const adminModel = require("../model/adminModel")
const {adminToken}=require("../utils/jwtToken")
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");


class adminController{
  
    createAdmin =async(req,res,next)=>{
        try {
            const usermail = await adminModel.findOne({admin_mail:req.body.admin_mail})
            if(usermail){
            return next(new CustomError("mail is already exists",409))

            }
            let user =await adminModel.create(req.body)

           user={
            _id:user._id,
            name:user.admin_name,
            email:user.admin_mail
           };

           adminToken(user,201,res,{message:"registered successfully"})
        } catch (error) {
            return next(new CustomError(error.message, 400));
            
        }
    } ;

    adminLogin = async(req,res,next)=>{

        try {
            const {admin_mail,admin_password}=req.body;
            if (!admin_email || !admin_password) {
                return next(
                  new CustomError("Please provide email & password for login", 400)
                );
              }
            const user = await adminModel.findOne({admin_mail}).select("+admin_password")
           
            const isMatch = await user.comparePasswordDb(
                admin_password,
                user.admin_password
              );
        
              if (!user || !isMatch) {
                const error = new CustomError("Incorrect email or password", 400);
                return next(error);
              }
              const data = {
                _id: user._id,
                name: user.admin_name,
                email: user.admin_email,
              };
              
              return await adminToken(data, 200, res);

        } catch (error) {
      return next(new CustomError("User doesn't exists", 400));
            
        }
    };

    
  logout=async(req, res, next) =>{
    const { shop_user } = req.cookies;

    if (!shop_user) {
      const error = new CustomError("No token in cookies");
      return next(error);
    }

    const options = {
      maxAge: 0,
      httpOnly: true,
    };

    res.cookie("shop_user", null, options);
    res.status(200).json({ status: "success", message: "Logout successful" });
  }

};

module.exports = adminController