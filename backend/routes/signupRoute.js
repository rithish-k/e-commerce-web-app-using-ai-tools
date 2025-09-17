const express = require('express');
const {loginUser, registerUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile,} = require("../controllers/SignUpcontroller")
const {isAuthenticatedUser, authorizeRoles,} =require("../middleware/auth")
// require('dotenv').config();
const router = express.Router()
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
module.exports=router