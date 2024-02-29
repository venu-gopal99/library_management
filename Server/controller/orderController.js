const orderModel = require("../model/orderModel");
const bookModel = require("../model/bookModel");
const CustomError = require("../utils/customError");
const studentModel = require("../model/studentModel");


class orderContoller {

    createOrder = async (req, res, next) => {
        const { id } = req.user;
        console.log(id,"id")
        const { book_id, book_count } = req.body;
        console.log(book_id, "hello");
        try {

            const previousOne = await orderModel.find({ student_id: id, status: "not returned" });
            if ((parseInt(previousOne[0]?.book_count) + parseInt(previousOne[1]?.book_count)) >= 2 || (parseInt(previousOne[0]?.book_count) + parseInt(book_count)) > 2 || parseInt(book_count) > 2) {
                return res.status(400).json({ message: "You can only take two books." });
                
            } else if (previousOne.length >= 2) {
                return res.status(400).json({ message: "Please return the previously taken books before ordering new ones." });
            }

            const count = await orderModel.findOne({ student_id: id })
            console.log(count, "sadfgwsegweg")
            
            const uniqueBookIds = new Set(book_id);
            const calculatedBookCount = uniqueBookIds.size === 1 ? 2 : 1;


            const finalBookCount = book_count !== undefined ? book_count : calculatedBookCount;
       
            if(previousOne.book_count > finalBookCount){
                return res.status(400).json({message:"please return the previous taken books"})
            }

            const book = await bookModel.findById(book_id);
            if (!book) {
                return res.status(404).json({ message: "Book not found." });
            }
            const rollno = await studentModel.findById({_id:id}) 
             console.log(rollno.student_ID,"student roll no")
             const std_roll = rollno.student_ID
            const order = await orderModel.create({
                student_id: id,
                book_id: book_id,
                student_rollno:std_roll,
                booked_date: new Date(),
                book_count: finalBookCount,
            }); console.log(order, "order")
            const newQuantity = book.book_quantity - finalBookCount;
            await bookModel.findByIdAndUpdate(book_id, { book_quantity: newQuantity });


            res.status(201).json({ order, message: "Orders created successfully." });
        } catch (error) {
            return next(new CustomError(error.message, 500));

        }
    };

    getOrderOne = async (req, res, next) => {
        try {
            const {id} = req.params;
            // const id = req.user;
            const orderOneUser = await orderModel.find({ student_rollno: id , status:"not returned" })
            return res.status(200).json({ orderOneUser })
        } catch (error) {
            return next(new CustomError(error.message, 500));

        }
    };
    orderHistory = async (req, res, next) => {
        try {
            const {id} = req.params;
            // const id = req.user;
            const orderOneUser = await orderModel.find({ student_rollno: id })
            return res.status(200).json({ orderOneUser })
        } catch (error) {
            return next(new CustomError(error.message, 500));

        }
    };
    fineDetail = async (req, res, next) => {
        try {
            const { id } = req.params;
            const orderOneUser = await orderModel.find({ student_rollno: id, fine_amount: { $ne: 0 } }); // Query modified to check fine_amount not equal to zero
            return res.status(200).json({ orderOneUser });
        } catch (error) {
            return next(new CustomError(error.message, 500));
        }
    };
    
    getOrder = async (req, res, next) => {
        try {
          
            // const id = req.user;
            const orderOneUser = await orderModel.find({  status:"not returned" })
            return res.status(200).json({ orderOneUser })
        } catch (error) {
            return next(new CustomError(error.message, 500));

        }
    };



    getAll = async (req, res, next) => {
        try {
            const allorder = await orderModel.find()
            return res.status(200).json({ allorder })
        } catch (error) {
            return next(new CustomError(error.message, 500));
        }
    };
    updateOrder = async (req, res, next) => {
        try {
            const { orderId } = req.params;
            const { returned_date, book_count } = req.body;
           console.log(typeof(book_count,"hguiyfuyfy"))
            const order = await orderModel.findById({ _id: orderId });
            if (!order) {
                return res.status(404).json({ message: "Order not found." });
            }
 
            order.returned_date = returned_date;
            order.status = "returned";
            const returndate = new Date(returned_date);

            if (returndate > order.due_date) {
                // console.log(returned_date, order.due_date, "coming...")
                const diffTime = Math.abs(returndate - order.due_date);
                // console.log(diffTime, "time");
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const fineAmount = diffDays * 2;
                order.fine_amount = fineAmount;
            }

            const updatedOrder = await order.save();

            //    console.log(book_count && book_count !== order.book_count,"quantity")
        
                const book = await bookModel.findById({ _id: order.book_id });
                if (!book) {
                    return res.status(404).json({ message: "Book not found." });
                }
                const count = parseInt(book_count);
                const bookcount = parseInt(book.book_quantity);
            console.log(typeof(bookcount),"qukefgwuiefgiewufgef")
                // console.log(book.book_quantity,count, "qqqqqqqqqqq")
                const newQuantity = bookcount + count;
                console.log(newQuantity,"wefgiweugfuiwefguiwgwueg")
                await bookModel.findByIdAndUpdate(order.book_id, { $set: { book_quantity: newQuantity } });

            

            res.status(200).json({ message: "book returned successfully.", updatedOrder });
        } catch (error) {
            return next(new CustomError(error.message, 500));
        }
    };
    updateFine = async (req, res, next) => {
        try {
            const { orderId } = req.params;
            console.log(orderId,"wsgvhgsiuvgsuiv")
            const fineAmt = await orderModel.findByIdAndUpdate({ _id: orderId },{$set:{fine_amount:"0"}})
            
                console.log(fineAmt,"finee")
          
            res.status(200).json({ message: "fine amount cleared", fineAmt })
        } catch (error) {
            return next(new CustomError(error.message, 500));

        }
    }

}
module.exports = orderContoller