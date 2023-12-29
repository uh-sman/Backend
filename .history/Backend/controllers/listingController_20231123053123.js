const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const upload = require('../index')
const cloudinary = require('cloudinary').v2;
const createListing = asyncHandler( async (req, res) => {
  try{
    // const {
    //   price,
    //     title,
    //     location,
    //     description,
    //     amenities,
    //     nearestLandmark,
    //     unitType,
    //     distanceToLandmark,
    //     photos,
    //     paymentFormat
    // } = req.body
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    cloudinary.uploader.upload(req.body.photos).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
    // const newListing = new Listing({
    //    price:price,
    //     title:title,
    //     location:location,
    //     description:description,
    //     amenities:amenities,
    //     nearestLandmark:nearestLandmark,
    //     unitType:unitType,
    //     distanceToLandmark:distanceToLandmark,
    //     // photos:req.file ? req.file.path : null,
    //     photos:photos,
    //     paymentFormat:paymentFormat
    // })


    // await newListing.save();
    // res.status(201).json(newListing)
  }catch(error){
    console.log(error)
  }
});
const deleteListing = asyncHandler(async(req, res) => {
    // const listing = await Listing.findById(req.params.id)
    console.log('.....req.query',req.query)
    const userId = req.query.userId
    const property = await Listing.findById(userId)
    if(!property) {
      // res.status(404).json('property not found')
      res.status(404)
      throw new Error('property not found')
    }else{
      await property.deleteOne()
      return res.json('property has been deleted successfully')
    }
  // res.send({message:'helloooo'});
  
})
const updateListing = asyncHandler( async (req, res) => {
try{ let userId = req.query.userId
 const updates = req.body

 const updatedListing = await Listing.findByIdAndUpdate(userId, updates, { new: true })
 if(!updatedListing) {
  return res.status(404).json({ message: 'Failed to updated Listings' })
 }
return res.status(200).json(updatedListing)
}
catch(error){
  return res.status(500).json({ error: "Error updating Listing" })
}
  // res.json(update)
})
const getListing = asyncHandler(async(req, res) => {
    let userId = req.query.userId
    const listing = await Listing.find()
  res.status(200).json(listing);
})
module.exports = {
  createListing,
  deleteListing,
  updateListing,
  getListing,
};
 

// const {
//   price,
//   title,
//   location,
//   description,
//   amenities,
//   nearestLandmark,
//   unitType,
//   distanceToLandmark,
//   photos,
//   paymentFormat
// } = req.body;
// // check if listings
// // res.send({
// //     price,
// //     title,
// //     location,
// //     description,
// //     amenities,
// //     nearestLandmark,
// //     unitType,
// //     distanceToLandmark,
// //     photos
// //   })
// if (
//   !price ||
//   !title ||
//   !location ||
//   !description ||
//   !amenities ||
//   !nearestLandmark ||
//   !unitType ||
//   !distanceToLandmark ||
//   !photos ||
//   !paymentFormat
// ) {
//   res.status(400);
//   throw new Error("cannot submit empty fields");
// }
// // check if listings exists
// const listingExists = await Listing.findOne({ title });

// if (listingExists) {
//   res.status(400);
//   throw new Error("Listing already exists");
// }

// const listing = await Listing.create({
//   price,
//   title,
//   location,
//   description,
//   amenities,
//   nearestLandmark,
//   unitType,
//   distanceToLandmark,
//   photos:req.file,
//   paymentFormat
// });
// if (listing) {
//   res.status(201).json({
//     price:listing.price,
//     title:listing.title,
//     location:listing.location,
//     description:listing.description,
//     amenities:listing.amenities,
//     nearestLandmark:listing.nearestLandmark,
//     unitType:listing.unitType,
//     distanceToLandmark:listing.distanceToLandmark,
//     photos:listing.photos,
//     paymentFormat:listing.paymentFormat
//   });
// }