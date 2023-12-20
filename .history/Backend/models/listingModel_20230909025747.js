const mongoose = require("mongoose");

const listingSchema = {
  title: {
    type: String,
    required: [true,`please add ${title}`]
  },
  price: {
    type: Number,
    required: [true,`please add ${price}`]
  },
  description: {
    type: String,
    required: [true,`please add ${description}`]
  },
  location: {
    type: String,
    required: [true,`please add ${location}`]
  },
  nearestLandmark: {
    type: String,
    required: [true,`please add ${nearestLandmark}`]
  },
  distanceToLandmark: {
    type: String,
    required: [true,`please add ${distanceToLandmark}`]
  },
  paymentType: {
    installment: {
      type: String,
      default:true
    },
    outright: {
      type: String,
      default:true
    },
  },
  paymentFormat: {
    type: String,
    required: [true,`please add ${paymentFormat}`]
  },
  unitType: {
    type: String,
    required: [true,`please add ${unitType}`]
  },
  photos: {
    type: String,
    required: [true,`please add ${photos}`]
  },
};
