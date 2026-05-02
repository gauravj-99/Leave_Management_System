const mongoose =require("mongoose");
const leaveSchema=new mongoose.schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    fromDate:String,
    toDate:String,
    reason:String,
    status:{
        enum:["pending", "approved", "reject"],
        default:"pending"
    }
});
module.exports= mongoose.model("leave",leaveSchema);