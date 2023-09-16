const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {protect} = require('../middleware/index')
const {
    registerUser,
    loginUser,
    profile
} = require('../controllers/userController')
const {sendOTP,OtpRouter} = require('../controllers/otpController')
router.post('/login', loginUser)
router.post('/register',registerUser)
router.get('/profile',  profile)
router.post('/otp',OtpRouter)

module.exports = router