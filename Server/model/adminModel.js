const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

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
adminSchema.pre("save", async function (next) {
    if (!this.isModified("admin_password")) return next;
    this.admin_password = await bcrypt.hash(this.admin_password, 14);
    next();
});

adminSchema.methods.comparePasswordInDb = async function (pwd, pswDB) {
    return await bcrypt.compare(pwd, pswDB);
};

module.exports = mongoose.model("tbl_admin",adminSchema)