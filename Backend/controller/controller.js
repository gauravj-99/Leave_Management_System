const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
exports.register= async(req,res)=>{
    const{name, email,password,role}=req.body;
    const hashedPassword=await
    bcrypt.hash(password, 10);
    const newUser= new User({name, email, password:hashedPassword, role});
    await newUser.save();
    res.json({message:"user registered"});
};
exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const foundUser=await User.findOne({email});
        if(!foundUser){
            return res.json({message: "User not found"});
        }
        const isMatch= await bcrypt.compare(password, foundUser.password);
        if(!isMatch){
            return res.json({message: "Password wrong"});
        }
        const token= jwt.sign(
            {id:foundUser._id, role:foundUser.role}, "secretkey", {expiresIn:"1d"}
        );
        res.json({message:"YOu are login",token});
    }catch(err){
        res.json({message:"Somting Went Wrong"});
    }
};
exports.getProfile=(req,res)=>{
    res.json({
        message:"This is protected data",user:req.user
    });
};