const mongoose = require('mongoose')
require('dotenv').config();

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then((data) =>{
        console.log("database connection successfull")
    })
    .catch((err)=>{
        console.log("connection error . the error is " , err.message)
    })
}

module.exports = dbconnect;