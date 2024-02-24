const bookModel = require("../model/bookModel")
const CustomError = require("../utils/customError")

class BookController {
    createBook = async (req, res) => {
        try {
            const { _id } = req.user;
            const files = req?.files;
           
            let newRow = 1;
            let newColumn = 1;

            const latestBook = await bookModel.findOne({}, {}, { sort: { 'createdAt': -1 } });

            if (latestBook) {
                newRow = latestBook.book_row + 1; // Increment row
                newColumn = latestBook.book_column + 1; // Increment column

                // Reset to 1 if exceeding maximum rows or columns
                if (newRow > 5) {
                    newRow = 1;
                    if (newColumn > 5) {
                        newColumn = 1;
                    }
                }
            }


            const newBook = await bookModel.create({
                adminId: _id,
                images: files,
                book_row: newRow,
                book_column: newColumn,
                ...req.body
            });  

            res.status(201).json({ newBook });
        } catch (error) {
            console.error("Error creating book:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    getAllBooks = async (req, res) => {
        try {
            const allBooks = await bookModel.find();
            if (!allBooks) {
                return res.status(404).json({
                    status: 404,
                    message: "books not found",
                });
            } res.status(200).json({ allBooks })
        } catch (error) {
            next(new CustomError(error.message, 500));

        }
    };

    deleteBook = async (req, res) => {
        try {
            const _id = req.params.id;
            const deleteOne = await bookModel.findByIdAndDelete(_id)
            return res.status(200).json({ deleteOne })
        } catch (error) {
            next(new CustomError(error.message, 500));

        }
    };

    updateBook = async (req, res) => {
        try {
            const _id = req.params.id;
            const data = req.body;
            const updateOne = await bookModel.findByIdAndUpdate(_id, data, { new: true })
            if (!updateOne) {
                return res.status(404).json({
                    status: 404,
                    message: "books not found",
                });
            } return res.status(200).json({ updateOne })
        } catch (error) {
            next(new CustomError(error.message, 500));
        };
    }

}

module.exports= BookController;