const User = require("../models/user");
const Leave=require("../models/leave");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
exports.register= async(req,res)=>{
    const{name, email,password,role}=req.body;
    const hashedPassword=await bcrypt.hash(password, 10);
    const newUser= new User({name, email, password:hashedPassword, role});
    await newUser.save();
    res.status(201).json({message:"user registered"});
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
        const token = jwt.sign(
            {id: foundUser._id, role: foundUser.role},
            "secretkey",
            {expiresIn: "1d"}
        );
        res.json({
            message: "You are logged in",
            token,
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
            },
        });
    } catch (err) {
        res.status(500).json({message:"Something Went Wrong"});
    }
};
exports.getProfile=(req,res)=>{
    res.json({
        message:"This is protected data",user:req.user
    });
};
exports.applyLeave = async (req, res) => {
  const { fromDate, toDate, reason } = req.body;

  if (!fromDate || !toDate || !reason) {
    return res.json({ message: "All fields are required" });
  }

  try {
    const newLeave = new Leave({
      userid: req.user.id,
      fromDate,
      toDate,
      reason
    });

    await newLeave.save();
    res.json({ message: "Leave Applied" });
  } catch (err) {
    res.json({ message: "Error applying leave" });
  }
};
exports.getMyLeaves=async(req,res)=>{
    try{
        const leaves= await Leave.find({ 
            
            userid:new mongoose.Types.ObjectId(req.user.id)
        });
        console.log("user", req.user);
        res.json(leaves);
    }catch(err){
        res.json({meaasge:"Error fetching leaves"});
    }
};
exports.updateLeaveStatus = async (req, res) => {
  if (req.user.role !== "manager") {
    return res.json({ message: "Only manager can update" });
  }

  try {
    const { leaveId, status } = req.body;

    await Leave.findByIdAndUpdate(leaveId, { status });
    res.json({ message: "Leave status updated" });
  } catch (err) {
    res.json({ message: "Error updating leave" });
  }
};
exports.getAllLeaves=async(req,res)=>{
    try{
        if(req.user.role!=="manager"){
            return res.json({message:"Access denied"});
        }
        const leaves=await
        Leave.find().populate("userid","name email");
        res.json(leaves);

    }catch(err){
        console.log(err);
        res.json({message:"Error fetching all leaves"});
    }

};