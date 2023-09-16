const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {
    registerUser,
    loginUser,
    profile
} = require('../../controllers/userController')

router.post('/create-listing',registerUser)
// router.put('/add', loginUser)
router.get('/get-listings', profile)

module.exports = router