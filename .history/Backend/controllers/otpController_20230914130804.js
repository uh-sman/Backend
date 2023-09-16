const asyncHandler = require('express-async-handler')
const OTP = require('../models/otp/index')
const generateOTP = require('../utils/index')
let otpFunc =  Math.floor(1000 + Math.random() * 9000)
const OtpRouter =asyncHandler(async(req,res) => {
    try{
        const {email,subject,message,duration} = req.body
        // res.send({
        //    email
        // })
        // console.log('opt',otp)
        // res.send({code:otp})
        if(!email){
            throw new Error ('Please enter the required values') 
         }
         await OTP.deleteOne({email})
         const generateOtp = await otp()
        // res.status(201).json({
        //     email,
        //     OTP: otp
        // })
        // sendOTP()
    }catch(error){
        res.send({error})
    }
})

const sendOTP = asyncHandler(async(req,res) => {
    const {email,subject,message,duration} = req.body
    //   res.send({
    //        email
    //     })
    try{
        if(!email){
           throw new Error ('Please enter the required values') 
        }

        const otp = await OTP.create({
            email,
            otpFunc,
        })

        if(otp) {
          try  {res.status(201).json({
                email,
                otpFunc
            })}catch(error){
                throw new Error('failed')
            }
        }
       await OTP.deleteOne({email})

    //    const generatedOTP = await generateOTP();
    }catch(error) {
        throw error;
    }
})

module.exports = {
    OtpRouter,
    sendOTP
}

// (email && subject && message)