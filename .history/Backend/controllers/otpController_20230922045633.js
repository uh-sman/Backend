const asyncHandler = require('express-async-handler')
const OTP = require('../models/otp/index')
const generateOTP = require('../utils/index')
const transporter = require('../email/index')
const User = require('../models/userModel')
let otps =  Math.floor(1000 + Math.random() * 9000)
const OtpRouter =asyncHandler(async(req,res) => {
    try{
        // const {email,subject,message,duration,ot} = req.body
        // const user = await User.findOne({email})
       
        res.send({
            // user,
            otps,
        })
    }catch(error){
        res.send({error})
    }
})

const sendOTP = asyncHandler(async(req,res) => {
    const {email,subject,message,duration = 0.1,createdAt,otp} = req.body
    try{
        if(otp === otps){
            res.status(200).send('login successful')

        }
        else{
            // res.status(400)
            throw new Error('oops failed to authenticate')

        }
        // if(!email){
        //    throw new Error ('Please enter the required values') 
        // }
        const userExist = await OTP.findOne({email})
        // OTP.
        // const date = await OTP.findOne({createdAt})
        // if(date >= duration)  {
        //     throw new Error("oops otp has expired")
        // }
        // else{
        //     res.send('successful')
        // }
        // const date = new Date
        if(userExist){
          const updateOtp =  await OTP.findOneAndUpdate({otp})
            if(updateOtp){
                res.send({
                    email,
                    otp,
                    // date
                })
            }
            
        }
        res.send({
            email,  
            otp,
        })   
        const createOtp = await OTP.create({
            email,
            otp,
        })
        if(createOtp) {
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