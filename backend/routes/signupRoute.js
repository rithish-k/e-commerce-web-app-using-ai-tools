const express = require('express');
const {logincheck,getregistrationDetails} = require("../controllers/SignUpcontroller")
// require('dotenv').config();
const router = express.Router()
router.route("/login").post(logincheck);
router.route("/register").post(getregistrationDetails);
module.exports=router