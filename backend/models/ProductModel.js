const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter the product Price"],
        maxLength:[8,"price cannot be more than 8 charectors"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"please enter the category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter the stock"],
        maxLength:[8,"please length cannot be more than 8"]
    },
    numofReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true

            },
            comment:{
                type:String,
                required:true
            }

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAT:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model("Product",productSchema)