const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const{
    createListing,
    deleteListing,
    updateListing,
    getListing
    } = require('../../controllers/listingController');
const { protect } = require('../../middleware');

router.post('/create-listing',createListing)
router.route('/create-listing/').post(protect,createListing).get(protect,)
// router.put('/add', loginUser)
// router.get('/get-listings', profile)

module.exports = router