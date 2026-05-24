const express = require("express");
const router = express.Router();
const { register, login, getProfile, applyLeave, getMyLeaves, updateLeaveStatus, getAllLeaves } = require("../controller/controller");
const authMiddleware = require("./middleware/middleware");
const authorize = require("./middleware/authorize");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.post("/apply_leave", authMiddleware, applyLeave);
router.get("/my_leaves", authMiddleware, getMyLeaves);
router.post("/update_leave", authMiddleware, authorize("manager"), updateLeaveStatus);
router.get("/all_leaves", authMiddleware, authorize("manager"), getAllLeaves);
module.exports=router;