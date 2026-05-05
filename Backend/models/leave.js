const mongoose =require("mongoose");
const leaveSchema=new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    fromDate:String,
    toDate:String,
    reason:String,
    status:{
        type:String,
        enum:["pending", "approved", "reject"],
        default:"pending"
    }
});
module.exports= mongoose.model("leave",leaveSchema);