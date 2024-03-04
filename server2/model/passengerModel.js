const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


const passengerSchema = new mongoose.Schema({
    passenger_name:{
        type:String,
        required:[true,"name is required"]
    },
    passenger_email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    passenger_password:{
        type:String,
        required:[true,"password is required"]
    },
    passenger_address:{
        type:String,
        required:true
    }
});


passengerSchema.pre("save",async function(){
 if(!this.isModified("passenger_password"))return;
 this.passenger_password = await bcrypt.hash(this.passenger_password,14)
});

passengerSchema.methods.comparePasswordInDb = async function(pwd,pswDB){
    return await bcrypt.compare(pwd,pswDB)
};
module.exports = mongoose.model("tbl_passenger", passengerSchema);
