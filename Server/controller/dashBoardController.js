const CustomError = require("../utils/customError");
const studentModel = require("../model/studentModel");
const orderModel = require("../model/orderModel");
const bookModel = require("../model/bookModel");


class dashBoardController{
    createCount = async(req,res,next)=>{
        
        try {
            const studentcount = await studentModel.countDocuments();
        const orderCount = await orderModel.countDocuments();
        const bookscount = await bookModel.countDocuments();
        const returncount = await orderModel.countDocuments({status:"returned"})
        const notReturncount = await orderModel.countDocuments({status:"not returned"})
        console.log(returncount)
        res.status(200).json({message:"count is updated",studentcount,orderCount,bookscount,returncount,notReturncount})
        } catch (error) {
            return next(new CustomError(error.message, 400));
        }
        
    }
}

module.exports=dashBoardController;