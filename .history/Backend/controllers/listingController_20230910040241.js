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
  res.send({message:'helloooo'});
  
})
const updateListing = (req, res) => {
  res.send(req.body);
};
const getListing = asyncHandler(async(req, res) => {
    // const {title} = req.body
    // const listing = await Listing.find({title:req.listing.title})
//   res.send(title);
res.send({message:'helloooo'});

//   res.send(listing);
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
