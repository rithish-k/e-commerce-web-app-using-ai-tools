const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/Error")
app.use(cors());
app.use(express.json())
//routes imports

const product = require("./routes/productRoute");
app.use("/api/v1/pro",product);
const signup = require("./routes/signupRoute");
app.use("/api/v1/signup",signup);

app.use(errorMiddleware);


module.exports = app