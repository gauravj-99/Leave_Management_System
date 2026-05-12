const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const routes=require("./routes/routes");
app.use("/api/auth",routes);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not defined. Set it in a .env file or environment variable.");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log("mongodb connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    console.error(err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000,()=> console.log("server running at 5000 port"));