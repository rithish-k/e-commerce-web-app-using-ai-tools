const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const signupModel = require('../models/signup');
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");


// require('dotenv').config();
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password,role}=req.body;
    const user = await signupModel.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample id",
            url:"ProfilePicUrl"
        },
        role
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

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })

})
    
//forgot Password
exports.forgotPassword =catchAsyncErrors(async(req,res,next)=>{
    const user = await signupModel.findOne({email : req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/signup/password/reset/${resetToken}`;
    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;
    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success:true,
            message : `email sent to ${user.email} sucessfully`,
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));

    }
    

})