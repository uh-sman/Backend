const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {protect,admin,superAdmin} = require('../middleware/index')
const rateLimitMiddleWare = require('../middleware/requestLimitMiddleware')
const {
    registerUser,
    loginUser,
    profile,
    getProfile,
    verify,
    getVerifyPin,
    updatePassword,
    resetPasswordRequestController,
    resetPasswordController,
    deleteUserController  
} = require('../controllers/userController')
const {sendOTP,OtpRouter} = require('../controllers/otpController')
router.route('/register').post(registerUser)
router.post('/login',   loginUser)
// update password route
router.route('/forgot-password-request').post(rateLimitMiddleWare,resetPasswordRequestController)
router.route('/forgot-password-reset').post(resetPasswordController)
router.route('/:id').delete(deleteUserController)
router.route('/profile').post(protect, profile).get(protect, getProfile)
router.post('/verify',verify)
router.route('/verify"/:userId/:uniqueString"').get(getVerifyPin)
router.route('/otp').get(OtpRouter).post(sendOTP)

module.exports = router