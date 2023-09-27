const asyncHandler = require('express-async-handler')
const OTP = require('../models/otp/index')
const generateOTP = require('../utils/index')
const transporter = require('../email/index')
const User = require('../models/userModel')
const express = require('express')
const otps =  Math.floor(1000 + Math.random() * 9000)
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
        if(otp){
            const userExist = await OTP.findOne({email})
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
        }
       
    }catch(error){
        throw new Error({error:'invalid access'})
    }
// if(!email){
        //    throw new Error ('Please enter the required values') 
        // }
        // OTP.
        // const date = await OTP.findOne({createdAt})
        // if(date >= duration)  {
        //     throw new Error("oops otp has expired")
        // }
        // else{
        //     res.send('successful')
        // }
        // const date = new Date
       
        // res.send({
        //     email,  
        //     otp,
        // })   
        // const createOtp = await OTP.create({
        //     email,
        //     otp,
        // })
        // if(createOtp) {
        //     try  {
        //         res.status(201).json({
        //         email,
        //         otp,
        //     })}
        
        
    // if(otp === otps){
    //     res.send('true')
    // }else{
    //     throw new Error('invalid token')
    // }
        
        await OTP.deleteOne({otp})
    
})

module.exports = {
    OtpRouter,
    sendOTP
}

// // (email && subject && message)
