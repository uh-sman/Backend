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
    contactNo:{
      type:String,
      required:true,
      isVerified:isVerifiedSchema,
    }
  },
  {
    timestamps: true,
  }
)
const isVerifiedSchema = mongoose.Schema({
  isVerified:Boolean
})

module.exports = mongoose.model('profile', profileSchema)
