const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const signupModel = require('../models/signup');
const sendToken = require("../utils/jwttoken");


// require('dotenv').config();
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user = await signupModel.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample id",
            url:"ProfilePicUrl"
        }
    })
    sendToken(user,201,res);
});


exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and password",400));
    }
    const user = await signupModel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    sendToken(user,200,res);

})
    