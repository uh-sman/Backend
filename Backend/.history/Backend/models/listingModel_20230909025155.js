const mongoose = require("mongoose");

const listingSchema = {
  title: {
    type: String,
    required: [true,'please add']
  },
  price: {
    type: Number,
    required: [true,'please add']
  },
  description: {
    type: String,
    required: [true,'please add']
  },
  location: {
    type: String,
    required: [true,'please add']
  },
  nearestLandmark: {
    type: String,
    required: [true,'please add']
  },
  distanceToLandmark: {
    type: String,
    required: [true,'please add']
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
    required: [true,'please add']
  },
  unitType: {
    type: String,
    required: [true,'please add']
  },
  photos: {
    type: String,
    required: [true,'please add']
  },
};
