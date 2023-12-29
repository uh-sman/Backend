const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const SuperAdminController = require('../controllers/admin/admin')

const {protect,admin,superAdmin} = require('../middleware/index')

router.route('/').post(protect,SuperAdminController)


module.exports = router