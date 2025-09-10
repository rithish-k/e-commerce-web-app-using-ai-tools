const express = require('express');
const {loginUser, registerUser, logout, forgotPassword,} = require("../controllers/SignUpcontroller")
// require('dotenv').config();
const router = express.Router()
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/logout").get(logout)
module.exports=router