const jwt = require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    try{

     const token =req.headers.authorization;
    if(!token){
        return res.json({message: "no token, access denoid"});
    }
    const actualToken =token.split(" ")[1];
    const decoded = jwt.verify(actualToken,"secretkey");
    req.user=decoded;
    next();

}catch(err){
    res.json({message: "invalid token "});
}

};
module.exports=authMiddleware;