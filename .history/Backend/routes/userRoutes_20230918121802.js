const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {protect} = require('../middleware/index')
const {
    registerUser,
    loginUser,
    profile,
    getProfile
} = require('../controllers/userController')
const {sendOTP,OtpRouter} = require('../controllers/otpController')
router.post('/login', loginUser)
router.post('/register',registerUser)
// router.post('/profile',  profile)
router.route('/profile').post(profile).get(getProfile)
router.route('/otp').get('/otp',OtpRouter).post('/post-otp',sendOTP)

module.exports = router