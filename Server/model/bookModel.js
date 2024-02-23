const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    book_name:{
        type:String,
        required:true,
    },
    book_author:{
        type:String,
        required:true,
    },
   
    book_quantity:{
        type:String,
        required:true,
    },
    ISBN:{
      type:String,
      required:true,
    },
    book_genre:{
        type:String,
        required:true,
    },
   images:[
    {
      type: [String],
      required: true
    },
    
  ],
  book_row:{
   type:Number,
   unique:true,
   enum:[1,2,3,4,5],
   default:1,
  },
  book_column:{
    type:Number,
    unique:true,
    enum:[1,2,3,4,5],
    default:1,
  },
  adminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tbl_admin",
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
 
},
{ timestamps: true }

)

module.exports = mongoose.model("tbl_book", bookSchema)