const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {
    SuperAdminSignUpController,
    superAdminLoginController,
    tokenRequestController
} = require('../controllers/admin/admin')

const {protect,admin,superAdmin} = require('../middleware/index')

router.route('/register').post(SuperAdminSignUpController)
router.route('/login').post(superAdminLoginController)
router.route('/tokenRequest').post(tokenRequestController)


module.exports = router