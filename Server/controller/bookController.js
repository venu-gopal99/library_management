const bookModel = require("../model/bookModel");
const CustomError = require("../utils/customError");

class BookController {
  createBook = async (req, res) => {
      try {
          const { _id } = req.user;
          const files = req?.files;

          // let newRow = 1;
          // let newColumn = 1;

          // const latestBook = await bookModel.findOne({}, {}, { sort: { 'createdAt': -1 } });

          // if (latestBook) {
          //     newRow = latestBook.book_row + 1; // Increment row
          //     newColumn = latestBook.book_column + 1; // Increment column

          //     // Reset to 1 if exceeding maximum rows or columns
          //     if (newRow > 5) {
          //         newRow = 1;
          //         if (newColumn > 5) {
          //             newColumn = 1;
          //         }
          //     }
          // }

          const newBook = await bookModel.create({
              adminId: _id,
              images: files,
             
              ...req.body
          });

          res.status(201).json({ newBook });
      } catch (error) {
          console.error("Error creating book:", error);
          res.status(500).json({ message: "Internal server error" });
      }
  };
//   createBook = async (req, res) => {
//     try {
//         const { _id } = req.user;
//         if (!_id) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }
//         const files = req?.files;
//         const combinedBook = Object.assign({}, req.body, { adminId: _id });

//         if (files) {
//             // If files are included in the request, process them
//             combinedBook.images = files.map((file) => `${file.filename}`);
//         }

//         // Get the total number of books currently stored
//         const totalBooks = await bookModel.countDocuments();

//         // Calculate the position of the new book in the grid
//         const row = Math.floor(totalBooks / 5) + 1; // Assuming 5 books per row
//         const column = (totalBooks % 5) + 1;

//         // Add position data to the book object
//         combinedBook.position = { row, column };

//         const newBook = await bookModel.create(combinedBook);

//         res.status(201).json({ newBook });
//     } catch (error) {
//         console.error("Error creating book:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


getOne = async (req,res,next)=>{
  try {
    const {id} = req.params;
    // console.log(id,"id")
    const bookOne = await bookModel.findById({_id:id})
    res.status(200).json({ bookOne });
}
   catch (error) {
    next(new CustomError(error.message, 500));
    
  }
    
}

  getAllBooks = async (req, res) => {
    try {
      const allBooks = await bookModel.find();
      // console.log(allBooks,"dfisugfiuwfgiuwfgciuwgfv")
      if (!allBooks) {
        return res.status(404).json({
          status: 404,
          message: "books not found",
        });
      }
      res.status(200).json({ allBooks });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  };

  deleteBook = async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteOne = await bookModel.findByIdAndDelete(_id);
      return res.status(200).json({ deleteOne });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  };

  updateBook = async (req, res) => {
    try {
      const {id} = req.params;
      console.log(id,"swdvcisdgvyusgvdc")
      const updateOne = await bookModel.findByIdAndUpdate({_id:id}, req.body, {
        runValidators:true,
        new: true,
      });
      console.log(updateOne,"sougheiughiufghe")
      if (!updateOne) {
        return res.status(404).json({
          status: 404,
          message: "books not found",
        });
      }
      return res.status(200).json({ updateOne });
    } catch (error) {
      console.log(error,"error")
      conso
    }
  };
}

module.exports = BookController;
