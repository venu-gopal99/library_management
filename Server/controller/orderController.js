const orderModel = require("../model/orderModel");
const bookModel = require("../model/bookModel");
const CustomError = require("../utils/customError");


class orderContoller {

    createOrder = async (req, res, next) => {
        const { id } = req.user;
        const {book_id, book_count } = req.body; // Assuming bookOrders is an array of { book_id, book_count }
            //  console.log(book_id,book_count,"qqqqqqqqqqqqqqqqqq")
        try {

            const previousOne = await orderModel.findOne({ student_id: id });
            console.log(previousOne,"hello")
            if (previousOne) {
                return res.status(400).json({ message: "please return the previous taken books" })
            };
            if (book_id.length <= 2) {
                return res.status(400).json({ message: "You can only order up to two books." });
            }
            

                const book = await bookModel.findById(book_id);
                if (!book) {
                    return res.status(404).json({ message: "Book not found." });
                }
                if (book.book_quantity < book_count) {
                    return res.status(400).json({ message: "Requested book quantity not available." });
                }
                const order = await orderModel.create({
                    student_id: id,
                    book_id:book_id,
                    booked_date: new Date(),
                    // status: "not returned",
                    book_count:book_count,
                }); console.log(order,"order")
                const newQuantity = book.book_quantity - book_count;
                await bookModel.findByIdAndUpdate(book_id, { book_quantity: newQuantity });
            

            res.status(201).json({order, message: "Orders created successfully." });
        } catch (error) {
            return next(new CustomError(error.message, 500));

        }
    };

    getOrderOne = async (req, res, next) => {
        try {
            const _id = req.params.id;
            const id = req.user;
            const orderOneUser = await orderModel.findById({_id, student_id: id })
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
            const {orderId} = req.params;
            const { returned_date,book_count } = req.body;
                // console.log(returned_date,book_count,orderId,"hiiiiii")
            // Find the order by its ID
            const order = await orderModel.findById({_id:orderId});
            if (!order) {
                return res.status(404).json({ message: "Order not found." });
            }
            //  console.log(order,"wvwdvwvwdvwvdsdv")
            // Update the order data
            order.returned_date = returned_date;
            order.status = "returned";
    
            // Calculate the fine amount if the return date is overdue
            if (returned_date > order.due_date) {
                console.log(returned_date,order.due_date,"coming...")
                const diffTime = Math.abs(returned_date - order.due_date);
                console.log(diffTime,"time");
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const fineAmount = diffDays * 2; // Fine amount is 2 Rs per day overdue
                order.fine_amount = fineAmount;
            }
    
            const updatedOrder = await order.save();
             
            // Update the corresponding book quantity if necessary
            if (book_count && book_count !== order.book_count) {
                // Find the corresponding book
                const book = await bookModel.findById({_id:order.book_id});
                if (!book) {
                    return res.status(404).json({ message: "Book not found." });
                }
                 console.log(book.book_quantity,"qqqqqqqqqqq")
                // Calculate the new book quantity
                const newQuantity = book.book_quantity + book_count;
    
                // Update the book quantity
                await bookModel.findByIdAndUpdate({_id:order.book_id,  book_quantity: newQuantity });
            }
    
            res.status(200).json({ message: "book returned successfully.", updatedOrder });
        } catch (error) {
            return next(new CustomError(error.message, 500));
        }
    };


}
module.exports=orderContoller