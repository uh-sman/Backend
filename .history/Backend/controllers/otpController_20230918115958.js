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
    const {email,subject,message,duration = 1,createdAt} = req.body
    try{
        if(!email){
           throw new Error ('Please enter the required values') 
        }

        const userExist = await OTP.findOne({email})
        // OTP.
        const date = await OTP.findOne({createdAt})
        if(userExist){
          const otps =  await OTP.findOneAndUpdate({otp})
            if(otps){
                res.send({
                    email,
                    otp,
                    date
                })
            }
        }
        res.send({
            email,  
            otp,
        })   
        const otps = await OTP.create({
            email,
            otp,
        })
        if(otps) {
            try  {
                res.status(201).json({
                email,
                otp,
            });
        }catch(error){
                throw new Error({error:'invalid access'})
            }
        }
        await OTP.deleteOne({otp})
   
        
    
    }catch(error) {
        throw error;
        
    }
})

module.exports = {
    OtpRouter,
    sendOTP
}

// (email && subject && message)