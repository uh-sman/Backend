const asyncHandler = require('express-async-handler')
const OTP = require('../models/otp/index')
const generateOTP = require('../utils/index')
const transporter = require('../email/index')
let otp =  Math.floor(1000 + Math.random() * 9000)
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
    const {email,subject,message,duration = 1} = req.body
    //   res.send({
    //        email
    //     })
    try{
        if(!email){
           throw new Error ('Please enter the required values') 
        }

        const userExist = await OTP.findOne({email})
        if(userExist){
        await OTP.deleteOne({email})
        }
        res.send({
            email,
            otp,
            // createdAt,
            // expiresAt
        })
        const otps = await OTP.create({
            email,
            otp,
            // duration
            // createdAt,
            // expiresAt
        })
        
        if(otps) {
            try  {
                res.status(201).json({
                email,
                otp,
                // timestamps
            });
        }catch(error){
                throw new Error({error:'invalid access'})
            }
        }
        // await OTP.deleteOne({email})
        
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