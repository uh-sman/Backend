const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");
const createListing = asyncHandler(async (req, res) => {
  const {
    price,
    title,
    location,
    description,
    amenities,
    nearestLandmark,
    unitType,
    distanceToLandmark,
    photos,
    paymentFormat
  } = req.body;
  // check if listings
// res.send({
//     price,
//     title,
//     location,
//     description,
//     amenities,
//     nearestLandmark,
//     unitType,
//     distanceToLandmark,
//     photos
//   })
  if (
    !price ||
    !title ||
    !location ||
    !description ||
    !amenities ||
    !nearestLandmark ||
    !unitType ||
    !distanceToLandmark ||
    !photos ||
    !paymentFormat
  ) {
    res.status(400);
    throw new Error("cannot submit empty fields");
  }
  // check if listings exists
  const listingExists = await Listing.findOne({ title });

  if (listingExists) {
    res.status(400);
    throw new Error("Listing already exists");
  }

  const listing = await Listing.create({
    price,
    title,
    location,
    description,
    amenities,
    nearestLandmark,
    unitType,
    distanceToLandmark,
    photos,
    paymentFormat
  });
  if (listing) {
    res.status(201).json({
      price:listing.price,
      title:listing.title,
      location:listing.location,
      description:listing.description,
      amenities:listing.amenities,
      nearestLandmark:listing.nearestLandmark,
      unitType:listing.unitType,
      distanceToLandmark:listing.distanceToLandmark,
      photos:listing.photos,
      paymentFormat:listing.paymentFormat
    });
  }
});
const deleteListing = asyncHandler(async(req, res) => {
    // const listing = await Listing.findById(req.params.id)
    console.log('.....req.query',req.query)
    const userId = req.query.userId
    const property = await Listing.findById(userId)
    if(!property) {
      res.status(404).json('not found')
    }else{
      await property.deleteOne()
      return res.json('property has been deleted successfully')
    }
  // res.send({message:'helloooo'});
  
})
const updateListing = asyncHandler( async (req, res) => {
  res.send(req.query);
  const userId = req.query.userId
  const update = await Listing.findById(userId)

  if(update) await update.updateOne({
    
  })
})
const getListing = asyncHandler(async(req, res) => {
    // const {title} = req.body
    const listing = await Listing.findById(req._id)
//   res.send(title);
// res.send({message:'helloooo'});

  res.send({listing});
})
// const createListing = (req,res) => {
//     res.send(req.body)
// }

module.exports = {
  createListing,
  deleteListing,
  updateListing,
  getListing,
};
