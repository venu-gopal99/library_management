const CustomError = require("../utils/customError");
const studentModel = require("../model/studentModel");
const orderModel = require("../model/orderModel")


class dashBoardController{
    createCount = async(req,res,next)=>{
        try {
            const studentcount = await studentModel.countDocuments();
        const orderCount = await orderModel.countDocuments();

        res.status(200).json({message:"count is updated",studentcount,orderCount})
        } catch (error) {
            return next(new CustomError(error.message, 400));
        }
        
    }
}

module.exports=dashBoardController;