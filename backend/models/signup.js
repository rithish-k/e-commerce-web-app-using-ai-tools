const mongoose= require("mongoose")

const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String   
})
const signupModel = mongoose.model("signupinfo",signupSchema)
module.exports = signupModel
