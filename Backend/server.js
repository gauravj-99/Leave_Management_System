const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
require ("dotenv").config();

const app= express();
app.use(cors());
app.use(express.json());

const routes=require("./routes/routes");
app.use("/api/auth",routes);

mongoose.connect("mongodb://127.0.0.1:27017/leave_management")
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err));


app.get("/",(req, res)=>{
    res.send("API is running");
});

app.listen(5000,()=> console.log("server running at 5000 port"));