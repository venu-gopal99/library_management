const adminModel = require("../model/adminModel");

class adminController{
    createAdmin=async(req,res)=>{
        try {
           const already = await adminModel.findOne({admin_mail:req.body.admin_mail})
           if(already){
            res.status(401).json({message:"mail already exists"})
           };
           
           let user = await adminModel.create(req.body);
           res.status(201).json({message:"Account created successfully"})
        } catch (error) {
            res.error(404).json({message:error})
        }
    };
    login = async(req,res)=>{
        try {
            const {admin_mail,admin_password} = req.body;
            if (!admin_mail && !admin_password) {
              res.status(404).json({message:"please provide email & password for login"})
              }
              let user = await adminModel.findOne({ admin_mail }).select("+admin_password");
              if (!user) {
                res.status(404).json({message:"user not found"})

              };
              const isMatch = await user.comparePasswordInDb(
                admin_password, user.admin_password);
        
              if (!isMatch) {
                res.status(400).json({message:"password is incorrect"})

              };
              res.status(201).json({message:"login successfull"})
        } catch (error) {
            res.error(500).json({message:error})
        }
    }
}

module.exports = adminController;