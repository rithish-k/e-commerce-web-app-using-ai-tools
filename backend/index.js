const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signupModel = require('./models/signup')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies from frontend to backend

mongoose.connect("mongodb+srv://Rithish:Rithish@cluster0.vrefyx6.mongodb.net/signup?retryWrites=true&w=majority&appName=Cluster0")
app.post("/login",(req,res)=> {
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
})
app.post('/register',(req,res)=>{
  console.log(req.body)
  signupModel.create(req.body)
    .then(signupinfo =>res.json(signupinfo))
    .catch(err=>res.status(500).json(err))
})
app.listen(3002,()=>{ 
  console.log("server is running")
})