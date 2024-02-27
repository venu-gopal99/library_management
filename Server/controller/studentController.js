const studentModel = require("../model/studentModel")
const CustomError = require("../utils/customError");
const { sendUserToken } = require("../utils/jwtToken");
// const crypto = require("crypto");
const { default: mongoose } = require("mongoose");



class studentController{
    createStudent=async(req,res,next)=>{
        try {
            const userAlready = await studentModel.findOne({student_ID : req.body.student_ID});
           if(userAlready){
            return next(new CustomError("student ID is already exists",409))
           };
           let user = await studentModel.create(req.body);
        
           user ={
            _id:user._id,
            name:user.student_name,
            phone:user.student_phoneNo,
            rollno:user.student_ID,
            email:user.student_email,
           };
           sendUserToken(user,201,res,{message:"your account created"})
        } catch (error) {
            return next(new CustomError(error.message, 400));
        }
    };

   login = async(req,res,next)=>{
    try {
        const {student_ID,student_password} = req.body;
        if(!student_ID && !student_password){
            const error=new CustomError("please provide  email & password for login",400)
            return next(error);
        }
        let user = await studentModel.findOne({student_ID}).select("+student_password");

        if(!user){
            const error = new CustomError("user is not found",404);
            return next(error)
        };
        const isMatch = await user.comparePasswordInDb(
            student_password,user.student_password);

            if(!isMatch){
                const error = new CustomError("passowrd is incorrect",400);
                return next(error)
            }
        user ={
            _id:user._id,
            name:user.student_name,
            rollno:user.student_ID,
        };
        sendUserToken(user,200,res,{message:"Login successfull"});

    } catch (error) {
      return next(new CustomError(error.message, 500));
        
    }
   };

   getAllStudent = async(req,res,next)=>{
    try {
        const allStudent = await studentModel.find()
        if (!allStudent) {
            return res.status(404).json({
              status: 404,
              message: "students not found",
            });
          }
        res.status(200).json({allStudent})
    } catch (error) {
        return next(new CustomError(error.message, 500)); 
    }
   
   }
 
}

module.exports= studentController;