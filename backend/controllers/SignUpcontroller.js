const signupModel = require('../models/signup')
// require('dotenv').config();
exports.logincheck = (req,res)=>{
    const{email, password}=req.body;
    signupModel.findOne({email: email})
    .then(user => {
        if(user) {
        if(user.password === password){
            res.json("Success")
        }
        else{
            res.json("the password is incorrect")
        }
        }
        else{
        res.json("No record found")
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));


}

exports.getregistrationDetails = (req,res) =>{
    console.log(req.body)
    signupModel.create(req.body)
        .then(signupinfo =>res.json(signupinfo))
        .catch(err=>res.status(500).json(err))

}