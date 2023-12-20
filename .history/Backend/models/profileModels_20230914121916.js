const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: [true, 'Please add a Firstname'],
    },
    Lastname: {
      type: String,
      required: [true, 'Please add an Lastname'],
      unique: true,
    },
    Dob: {
      type: String,
      required: [true, 'Please add a DOB'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('profile', profileSchema)
