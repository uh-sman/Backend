const mongoose = require('mongoose')
// const isVerifiedSchema = mongoose.Schema({
//   isVerified:Boolean
// })

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
    phoneNo:{
      type:String,
      required:true,
      unique:true 
      // isVerified:isVerifiedSchema  ? isVerifiedSchema.length != 0 : false,
    },
    isVerified:{
      default : false,
      type:Boolean
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('profile', profileSchema)
// module.exports = mongoose.model('verification', isVerifiedSchema)
