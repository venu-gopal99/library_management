const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    train_name:{
        type:String,

    },
    train_no:{
        type:String,

    },
    scheduled_time:{
        type:String,
    },
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    price:{
        type:String
    },
    no_of_seats:{
        type:String
    },
    total_price:{
        type:String
    }

});

module.exports=mongoose.model("tbl_booking",bookSchema)