const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {protect} = require('../middleware/index')
const {
    registerUser,
    loginUser,
    profile,
    getProfile,
    verify,
    getVerifyPin,
    updatePassword  
    // OtpRouter
} = require('../controllers/userController')
const {sendOTP,OtpRouter} = require('../controllers/otpController')
// router.post('/login', sendOTP,loginUser)
router.route('/register').post(registerUser)
router.post('/login',  loginUser)
// update password route
router.route('/forgot-password').post(updatePassword)
// router.route('/register').post(registerUser).post(sendOTP)
// router.post('/profile',  profile)
router.route('/profile').post(profile).get(getProfile)
router.post('/verify',verify)
router.route('/verify"/:userId/:uniqueString"').get(getVerifyPin)
router.route('/otp').get(OtpRouter).post(sendOTP)

module.exports = router