const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    train_name: {
        type: String,
        required: true,
    },
    train_No: {
        type: String,
        required: true,
    },
    train_departs: {
        type: String,
        required: true,
    },
    train_destination: {
        type: String,
        required:true,
    },
    total_coach:{
        type:Number,
        required:true,
    },
    seats_eachcoach:{
        type:Number,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    shedule_time:{
        type:String,
        required:true,
    },
    train_seats:[{
        type:String
    }],
    status:[{
        type:String,
        enum:["Available","confirmed","waiting"],
        default:"Available"
    }]




});

module.exports = mongoose.model("tbl_train", trainSchema);