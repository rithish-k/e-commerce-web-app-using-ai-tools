const mongoose= require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken") 
const crypto = require("crypto");

const signupSchema = new mongoose.Schema({

    name: {
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 charactors"],
        minLength:[1,"Name Should have more than one charector"]
    },
    email: {
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]

    },
    password: {
        type:String,
        required:[true,"Please enter your password"],
        maxLength:[8,"Name cannot exceed 8 charrectors"]
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

signupSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
//jwt token

signupSchema.methods.getJWTToken = function () {
    return JWT.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

signupSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password);
}
signupSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    //hashing and adding to signupschema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;


}
const signupModel = mongoose.model("signupinfo",signupSchema)
module.exports = signupModel
