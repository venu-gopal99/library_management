const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    book_name:{
        type:String,
        // required:true,
    },
    book_author:{
        type:String,
        // required:true,
    },
   
    book_quantity:{
        type:String,
        // required:true,
    },
    ISBN:{
      type:String,
      // required:true,
    },
    book_genre:{
        type:String,
        // required:true,
    },
    images: [{type:String}],
   
    
  
  
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tbl_admin",
},

  is_deleted: {
    type: Boolean,
    default: false
  },
 
},
{ timestamps: true }

)

module.exports = mongoose.model("tbl_book", bookSchema)