const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/Error")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//routes imports

const product = require("./routes/productRoute");
app.use("/api/v1/pro",product);
const signup = require("./routes/signupRoute");
app.use("/api/v1/signup",signup);
const order = require("./routes/orderRoute");
// const bodyParser = require("body-parser");
app.use("/api/v1",order);

app.use(errorMiddleware);


module.exports = app