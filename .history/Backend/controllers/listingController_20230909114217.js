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
    photos
  } = req.body;
  // check if listings
res.send({
    price,
    title,
    location,
    description,
    amenities,
    nearestLandmark,
    unitType,
    distanceToLandmark,
    photos
  })
  if (
    !price ||
    !title ||
    !location ||
    !description ||
    !amenities ||
    !nearestLandmark ||
    !unitType ||
    !distanceToLandmark ||
    !photos
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
    photos
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
    });
  }
});
const deleteListing = (req, res) => {
  res.send(req.body);
};
const updateListing = (req, res) => {
  res.send(req.body);
};
const getListing = (req, res) => {
  res.send(req.body);
};
// const createListing = (req,res) => {
//     res.send(req.body)
// }

module.exports = {
  createListing,
  deleteListing,
  updateListing,
  getListing,
};
