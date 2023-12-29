const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const router = express.Router()
const{
    createListing,
    deleteListing,
    updateListing,
    getListing
    } = require('../../controllers/listingController');
const { protect ,admin, superAdmin} = require('../../middleware/index');
// const upload = require('../..');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
// router.route('/').post(superAdmin ,createListing)
// router.get('/get-listing', getListing)
// router.route('/create-listing/').post(protect,createListing).get(protect,getListing)
// router.put('/add', loginUser)
// router.route('/:id').delete()
router.route('/:userId').delete(deleteListing).put(updateListing).post(superAdmin,upload.single('photos'),createListing).get(getListing)
// router.get('/get-listings', profile)
  
module.exports = router