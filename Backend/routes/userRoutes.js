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
    getVerifyPin
    // OtpRouter
} = require('../controllers/userController')
const {sendOTP,OtpRouter} = require('../controllers/otpController')
// router.post('/login', sendOTP,loginUser)
router.post('/login',sendOTP,loginUser)
router.post('/register',sendOTP,registerUser)
// router.route('/register').post(registerUser).post(sendOTP)
// router.post('/profile',  profile)
router.route('/profile').post(profile).get(getProfile)
router.route('/verify').get(getVerifyPin).post(verify)
router.route('/otp').get(OtpRouter).post(sendOTP)

module.exports = router