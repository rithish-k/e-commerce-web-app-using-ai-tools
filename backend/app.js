const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
//routes imports

const product = require("./routes/productRoute");
app.use("/api/v1/pro",product);
const signup = require("./routes/signupRoute");
app.use("/api/v1/signup",signup);
module.exports = app