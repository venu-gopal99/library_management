const orderModel = require("../model/orderModel");
const bookModel = require("../model/bookModel");
const CustomError = require("../utils/customError");


class orderContoller {

    createOrder = async (req, res, next) => {
        const { id } = req.user;
        const { book_id, book_count } = req.body;
        console.log(book_id, "hello");
        try {

            const previousOne = await orderModel.find({ student_id: id, status: "not returned" });
            if ((parseInt(previousOne[0]?.book_count) + parseInt(previousOne[1]?.book_count)) >= 2 || parseInt(previousOne[0]?.book_count) + parseInt(book_count) > 2) {
                return res.status(400).json({ message: "You can only take two books." });

            } else if (previousOne.length >= 2) {
                return res.status(400).json({ message: "Please return the previously borrowed books before ordering new ones." });
            }

            const count = await orderModel.findOne({ student_id: id })
            console.log(count, "sadfgwsegweg")

            const uniqueBookIds = new Set(book_id);
            const calculatedBookCount = uniqueBookIds.size === 1 ? 2 : 1;


            const finalBookCount = book_count !== undefined ? book_count : calculatedBookCount;


            const book = await bookModel.findById(book_id);
            if (!book) {
                return res.status(404).json({ message: "Book not found." });
            }

            const order = await orderModel.create({
                student_id: id,
                book_id: book_id,
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
            const _id = req.params.id;
            const id = req.user;
            const orderOneUser = await orderModel.findById({ _id, student_id: id })
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
            // console.log(returned_date,book_count,orderId,"hiiiiii")
            // Find the order by its ID
            const order = await orderModel.findById({ _id: orderId });
            if (!order) {
                return res.status(404).json({ message: "Order not found." });
            }
            //  console.log(order,"wvwdvwvwdvwvdsdv")
            // Update the order data
            order.returned_date = returned_date;
            order.status = "returned";
            const returndate = new Date(returned_date);

            if (returndate > order.due_date) {
                // console.log(returned_date, order.due_date, "coming...")
                const diffTime = Math.abs(returndate - order.due_date);
                console.log(diffTime, "time");
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const fineAmount = diffDays * 2;
                order.fine_amount = fineAmount;
            }

            const updatedOrder = await order.save();


            if (book_count && book_count !== order.book_count) {
                const book = await bookModel.findById({ _id: order.book_id });
                if (!book) {
                    return res.status(404).json({ message: "Book not found." });
                }
                console.log(book.book_quantity, "qqqqqqqqqqq")
                const newQuantity = book.book_quantity + book_count;
                await bookModel.findByIdAndUpdate(order.book_id, { $inc: { book_quantity: newQuantity } });

            }

            res.status(200).json({ message: "book returned successfully.", updatedOrder });
        } catch (error) {
            return next(new CustomError(error.message, 500));
        }
    };
    updateFine = async (req, res, next) => {
        try {
            const { orderId } = req.params;
            const fineAmt = await orderModel.findByIdAndUpdate({ _id: orderId })
            if (!fineAmt.fine_amount == " ") {
                res.status(200).jsonm({ message: "there is no fine amount " })
            }
            res.status(200).json({ message: "fine amount cleared", fineAmt })
        } catch (error) {

        }
    }

}
module.exports = orderContoller