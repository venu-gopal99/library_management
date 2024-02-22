const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orders: [{
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tbl_book",
        },
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tbl_student",
        },
        booked_date: {
            type: Date,
            default: Date.now,
        },
        due_date: {
            type: Date,
            default: function() {
                return new Date(this.booked_date.getTime() + 2 * 24 * 60 * 60 * 1000); // Due date is 2 days from booked date
            },
        },
        returned_date: {
            type: Date,
        },
        fine_amount: {
            type: Number,
            default: function() {
                if (this.returned_date) {
                    const diffTime = Math.abs(this.returned_date - this.due_date);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays > 0 ? diffDays * 2 : 0; // Fine amount is 2 Rs per day overdue
                }
                return 0;
            },
        },
        status: {
            type: String,
            enum: ["returned", "not returned"],
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    }],
}, { timestamps: true });

// Method to update returned date when the book is returned
orderSchema.methods.returnBook = function(bookId) {
    const order = this.orders.find(order => order.book_id.toString() === bookId.toString());
    if (order) {
        order.status = "returned";
        order.returned_date = new Date();
        return order.save();
    }
    return null; // Book not found in the orders
};

module.exports = mongoose.model("tbl_order", orderSchema);
