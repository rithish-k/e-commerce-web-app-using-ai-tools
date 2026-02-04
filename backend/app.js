const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/Error")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
// const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

const product = require("./routes/productRoute");
app.use("/api/v1/pro",product);
const signup = require("./routes/signupRoute");
app.use("/api/v1/signup",signup);
const order = require("./routes/orderRoute");
// const bodyParser = require("body-parser");
app.use("/api/v1",order);
const payment = require("./routes/paymentRoute");
app.use("/api/v1",payment);


app.use(errorMiddleware);


module.exports = app