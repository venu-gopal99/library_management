const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tbl_student",
    },

    book_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tbl_book",
    }],

    booked_date: {
        type: Date,
        default: Date.now,
    },
    due_date: {
        type: Date,
        default: function () {
            return new Date(this.booked_date.getTime() + 2 * 24 * 60 * 60 * 1000); // Due date is 2 days from booked date
        },
    },
    returned_date: {
        type: Date,
    },
    fine_amount: {
        type: Number,
    
    },
    status: {
        type: String,
        enum: ["returned", "not returned"],
        default:"not returned",
    },
    book_count:{
        type:String,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });



module.exports = mongoose.model("tbl_order", orderSchema);
