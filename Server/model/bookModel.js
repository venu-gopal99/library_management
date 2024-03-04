const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
    },
    book_author: {
        type: String,
    },
    book_quantity: {
        type: String,
    },
    ISBN: {
        type: String,
    },
    book_genre: {
        type: String,
    },
    images: [{ type: String }],

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_admin",
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("tbl_book", bookSchema);
