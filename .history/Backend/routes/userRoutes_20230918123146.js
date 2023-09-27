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
    OtpRouter
} = require('../controllers/userController')
const {sendOTP} = require('../controllers/otpController')
router.post('/login',OtpRouter, loginUser)
router.post('/register',registerUser)
// router.post('/profile',  profile)
router.route('/profile').post(profile).get(getProfile)
router.route('/otp').get(OtpRouter).post(sendOTP)

module.exports = router