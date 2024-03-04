const { default: mongoose } = require("mongoose");
const passengerModel = require("../model/passengerModel");

class passengerController{
createPassenger = async(req,res)=>{
    try {
        const already = await passengerModel.findOne({passenger_email:req.body.passenger_email})
        if(already){
            res.status(409).json({message:"email is already exists"})
        }
        const user = await passengerModel.create(req.body);
        res.status(201).json({user,message:"account created successfully"})
    } catch (error) {
        res.status(500).json({error})
    }
};
login= async(req,res)=>{
  try {
    const {passenger_email,passenger_password}=req.body;
    if(!passenger_email && !passenger_password){
        res.status(400).json({message:"please provide email address and password"})
    };
    let user = await passengerModel.findOne({passenger_email}).select("+passenger_password");
    if(!user){
       res.status(404).json({message:"user is not found"})
    };
    const isMatch = await user.comparePasswordInDb(
        passenger_password,user.passenger_password
    );
    if(!isMatch){
        res.status(400).json({message:"password is incorrect"})
    };

    res.status(200).json({user,message:"logged in successfully"})
  } catch (error) {
    res.status(500).json({error})
  }
};
}
module.exports=passengerController;