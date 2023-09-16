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
router.get('/get-listing',getListing)
// router.route('/create-listing/').post(protect,createListing).get(protect,getListing)
// router.put('/add', loginUser)
// router.route('/:id').delete()
router.delete('/:id',deleteListing)
// router.get('/get-listings', profile)

module.exports = router