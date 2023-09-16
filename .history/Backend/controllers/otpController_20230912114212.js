const asyncHandler = require('express-async-handler')
const OTP = require('../models/otp/index')
const generateOTP = require('../utils/index')
const OtpRouter =(req,res) => {
    try{
        // const {email,subject,message,duration} = req.body
        console.log({
            message:"message"
        })
    }catch(error){
        res.status(401).send({error})
    }
}

const sendOTP = async({email,subject,message,duration = 1}) => {
    try{
        if(!email){
           throw new Error ('Please enter the required values') 
        }
       await OTP.deleteOne({email})

       const generatedOTP = await generateOTP();
    }catch(error) {

    }
}

module.exports = {
    OtpRouter,
    sendOTP
}

// (email && subject && message)