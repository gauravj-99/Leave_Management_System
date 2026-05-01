const express = require("express");
const router = express.Router();
const {register, login, getProfile}=require("../controller/controller");
const authMiddleware=require("./middleware/middleware");
router.post("/register", register);
router.post("/login",login);
router.get("/profile", authMiddleware,getProfile);
module.exports=router;