const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//CREATE product --ADMIN

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
//Get ALL Products
exports.getAllProducts= catchAsyncErrors(async (req,res)=>{
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter();
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products
    })
});
//update product --admin
exports.updateProduct = catchAsyncErrors(async(req,res)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        success:true,
        product

    })
});
exports.deleteProduct = catchAsyncErrors(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"

    })
});
//get product details
exports.getProductdetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        product
    })
});