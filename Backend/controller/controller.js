const User = require("../models/user");
exports.register= async(req,res)=>{
    const{name, email,password,role}=req.body;
    const newUser= new User({name, email, password, role});
    await newUser.save();
    res.json({message:"user registered"});
};