const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const multer = require('multer')
const {protect,admin,superAdmin} = require('../middleware/index')
const rateLimitMiddleWare = require('../middleware/requestLimitMiddleware')
const {
    registerUser,
    loginUser,
    profile,
    getProfile,
    verify,
    resetPasswordRequestController,
    resetPasswordController,
    deleteUserController  
} = require('../controllers/userController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({  storage: storage  })
router.route('/register').post(upload.single('profilePicture'),registerUser)
router.post('/login',loginUser)
router.route('/user/:userId').get(getProfile)
// update password route
router.route('/forgot-password-request',).post(rateLimitMiddleWare,resetPasswordRequestController)
router.route('/forgot-password-reset').post(resetPasswordController)
router.route('/:userId').delete(deleteUserController)
router.route('/profile').post(protect, profile).get(protect, getProfile)
router.post('/verify',verify)
// router.delete('/:id',deleteUserController)
// router.route('/verify"/:userId/:uniqueString"').get(getVerifyPin)
// router.route('/otp').get(OtpRouter).post(sendOTP)

module.exports = router