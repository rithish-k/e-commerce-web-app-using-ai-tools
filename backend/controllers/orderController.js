const Order = require("../models/OrderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures"); 
const Product = require("../models/ProductModel");
const { validate } = require("../models/signup");
exports.newOrder = catchAsyncErrors(async (req,res,next) => {
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}= req.body;
    const order =  await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        order
    })
    })
//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");//learn how the api know to look into the user database using the user function
    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }
    res.status(200).json({
        success:true,
        order
    })


})
//get logged in user orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        order
    })


})
// get all orders for admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount += orders.totalPrice;
    });
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })


})
// update order status
exports.updateOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("you have already delivered this order",404));
    }
    order.orderItems.forEach(async (o)=>{
        await updateStock(o.product,o.quantity);
    })
    order.orderStatus =  req.body.status;
    if(req.body.status == "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })



})

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}

//delete order
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }
    await order.deleteOne();

    res.status(200).json({
        success:true
    })


})
