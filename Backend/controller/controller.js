const User = require("../models/user");
const Leave = require("../models/leave");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "user registered" });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            const err = new Error("User not found");
            err.status = 404;
            return next(err);
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            const err = new Error("Invalid credentials");
            err.status = 401;
            return next(err);
        }
        const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, JWT_SECRET, { expiresIn: "1d" });
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
        next(err);
    }
};

exports.getProfile = (req, res) => {
    res.json({ message: "This is protected data", user: req.user });
};

exports.applyLeave = async (req, res, next) => {
    try {
        const { fromDate, toDate, reason } = req.body;

        if (!fromDate || !toDate || !reason) {
            const err = new Error("All fields are required");
            err.status = 400;
            return next(err);
        }

        const newLeave = new Leave({ userid: req.user.id, fromDate, toDate, reason });
        await newLeave.save();
        res.status(201).json({ message: "Leave Applied", leave: newLeave });
    } catch (err) {
        next(err);
    }
};

exports.getMyLeaves = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        const skip = (page - 1) * limit;

        const query = { userid: new mongoose.Types.ObjectId(req.user.id) };

        const [leaves, total] = await Promise.all([
            Leave.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
            Leave.countDocuments(query),
        ]);

        res.json({ data: leaves, meta: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (err) {
        next(err);
    }
};

exports.updateLeaveStatus = async (req, res, next) => {
    try {
        if (req.user.role !== "manager") {
            const err = new Error("Only manager can update");
            err.status = 403;
            return next(err);
        }

        const { leaveId, status, managerRemarks } = req.body;
        const update = { status };
        if (managerRemarks) update.managerRemarks = managerRemarks;

        const updated = await Leave.findByIdAndUpdate(leaveId, update, { new: true });
        if (!updated) {
            const err = new Error("Leave not found");
            err.status = 404;
            return next(err);
        }

        res.json({ message: "Leave status updated", leave: updated });
    } catch (err) {
        next(err);
    }
};

exports.getAllLeaves = async (req, res, next) => {
    try {
        if (req.user.role !== "manager") {
            const err = new Error("Access denied");
            err.status = 403;
            return next(err);
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        const skip = (page - 1) * limit;

        const { search, status, fromDate, toDate, sortBy } = req.query;
        const query = {};

        if (status) query.status = status;
        if (fromDate || toDate) query.fromDate = {};
        if (fromDate) query.fromDate.$gte = new Date(fromDate);
        if (toDate) query.fromDate.$lte = new Date(toDate);
        if (search) {
            query.$or = [
                { reason: { $regex: search, $options: "i" } },
            ];
        }

        const sort = {};
        if (sortBy === "oldest") sort.createdAt = 1;
        else sort.createdAt = -1;

        const [leaves, total] = await Promise.all([
            Leave.find(query).populate("userid", "name email").skip(skip).limit(limit).sort(sort),
            Leave.countDocuments(query),
        ]);

        res.json({ data: leaves, meta: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (err) {
        next(err);
    }
};