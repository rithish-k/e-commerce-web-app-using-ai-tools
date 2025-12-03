const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const signupModel = require('../models/signup');
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const cloudinary = require("cloudinary");

// require('dotenv').config();
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{

    const file = req.files.avatar;

    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const {name,email,password}=req.body;
    const user = await signupModel.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
        // role
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
    // console.log("REQ BODY:", req.body);
    const user = await signupModel.findOne({email : req.body.email});
    //  console.log("USER FOUND:", user);
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    console.log("AFTER SAVE USER:", user);
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/signup/password/reset/${resetToken}`;
    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;
    console.log(message);
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

exports.resetPassword = catchAsyncErrors(async (req,res,next) =>{

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log("URL Token (plain):", req.params.token);
    console.log("URL Token (hashed):", resetPasswordToken);


    const user = await signupModel.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now() },


    })
    // console.log("USER FOUND:", user);
    console.log("DB user:", user);
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",404));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res);


})
// Get user Details
exports.getUserDetails = async(req,res,next) =>{
    try{
        const user = await signupModel.findById(req.user.id);
        res.status(200).json({
            sucess:true,
            user,
        })

    }catch(error){
        next(error);
    }
}
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await signupModel.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesnt match",400));
    }
    user.password = req.body.newPassword;
    await user.save()
    sendToken(user,200,res);

})
//update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }
    const user = await signupModel.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,

    })
    res.status(200).json({
        success:true,
    })

})
//admin to get all user details
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await signupModel.find();
    if(users.length === 0){
        return next(new ErrorHandler("Users not found",404));
    }
    res.status(200).json({
        success:true,
        users,
    }) 
})
//admin get single user
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await signupModel.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does exist with id ${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user,
    }) 
})
//admin to update roles of the user
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    const user = await signupModel.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,

    })
    res.status(200).json({
        success:true,
    })

})
//delete user for admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await signupModel.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User doesnot exist with id ${req.params.id}`));
    }
    await user.deleteOne();
    res.status(200).json({
        success:true,
        message:"User deleted sucessfully"
        
    })

})
