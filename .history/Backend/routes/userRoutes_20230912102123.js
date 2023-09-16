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
const sendOTP = require('../controllers/otpController')
router.post('/login', loginUser)
router.post('/register',registerUser)
router.get('/profile',  profile)

module.exports = router