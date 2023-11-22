const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const {
    SuperAdminSignUpController,
    superAdminLoginController,
    tokenRequestController,
    tokenConfirmationController,
    requestTokenController,
    deleteAdminController,
    getUserByAdminController,
    createAdminController,
    updateAdminController
} = require('../controllers/admin/admin')

const {protect,admin, superAdmin} = require('../middleware/index')

router.route('/register').post(SuperAdminSignUpController)
router.route('/user').get(superAdmin, getUserByAdminController)
router.route('/login').post(superAdminLoginController)
router.route('/tokenRequest').post(tokenRequestController)
router.route('/admin').post(createAdminController).put(updateAdminController)
router.route('/confirmToken').post(tokenConfirmationController)
router.route('/requestToken').post(requestTokenController)
router.route('/:userId').delete( superAdmin, deleteAdminController)


module.exports = router