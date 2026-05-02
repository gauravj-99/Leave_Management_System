const User = require("../models/user");
const leave=require("../models/leave");
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
exports.applyleave= async(req, res)=>{
    try{
        const{ fromDate, toDate,reason}=req.body;
        const newLeave = new leave({
            userid:req.user.id,
            fromDate,
            toDate,
            reason
        });
        await newLeave.save();
        res.json({ message: "Leave Applied"});
    }catch(err){
        res.json({messasge:"error"});
    }
};
exports.getMyLeaves=async(req,res)=>{
    try{
        const leaves= await leave.find({ userid:
            req.user.id
        });
        res.json(leaves);
    }catch(err){
        res.json({meaasge:"Error fetching leaves"});
    }
};
exports.updateLeavestatus=async(req,res)=>{
    try{
        const{ leaveId,status}=req.body;
        await leave.findByIdAndUpdate(leaveId,{status});
        res.json({message:"leave status update"});
    }catch(err){
        rez.json({message:"error updating leave"});
    }
};