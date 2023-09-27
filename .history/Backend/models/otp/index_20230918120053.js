const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    email:String, 
    otp:Number,
    date:Date,
   
    // createdAt: Date,
    // expiresAt: Date,
},
{
    timestamps:true,
})


const OTP = mongoose.model('OTP',OTPSchema)

module.exports = OTP