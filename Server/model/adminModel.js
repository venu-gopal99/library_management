const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    admin_name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
    },
    admin_mail:{
        type:String,
        unique:true,
    },
    admin_phone:{
        type:Number,
        unique:true,
        required:[true,"phone number is required"],

    },
    admin_password:{
        type:String,
        required:[true,"password is required"],
    },
    role: {
        type: String,
        enum: ["student", "librarian"],
        default: "librarian",
      },
    
},
{timestamps:true}
)


module.exports = mongoose.model("tbl_admin",adminSchema)