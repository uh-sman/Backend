const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const router = express.Router()
const{
    createListing,
    deleteListing,
    updateListing,
    getListing
    } = require('../../controllers/listingController')

router.post('/create-listing',createListing)
// router.put('/add', loginUser)
router.get('/get-listings', profile)

module.exports = router