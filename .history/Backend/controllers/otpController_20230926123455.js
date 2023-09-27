const asyncHandler = require("express-async-handler");
const OTP = require("../models/otp/index");
const generateOTP = require("../utils/index");
const transporter = require("../email/index");
const User = require("../models/userModel");
const express = require("express");
const otps =  Math.floor(1.0000 + Math.random() * 9000);     

const OtpRouter = asyncHandler(async (req, res) => {
  try {
    // const {email,subject,message,duration,ot} = req.body
    // const user = await User.findOne({email})

    res.send({
      // user,
      otps,
    });
  } catch (error) { 
    res.send({ error });
  }   
});

const sendOTP = asyncHandler(async (req, res) => {
  const { email, subject, message, duration = 0.1, createdAt, otp } = req.body;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject:  `OTP CODE FROM ${email}`,
    html: `<h1>Your otp is${otp}</h1>`
  }
  const createOtp = await OTP.create({
    email,
    otp,
  });
try{
//    let mail = await transporter.sendMail(mailOptions,function(error,info){
// })  
let mail = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject:  `OTP CODE FROM ${email}`,
    html: `<h1>Your otp is${otp}</h1>`
})
res.json({
      email,
      otp,
    });
    console.log(mail)
}catch(err){
    console.log(err)
    throw new Error("token does not exist");
}
  // const updateOtp = await OTP.findOneAndUpdate({otp})
  try{
    const updateOtp = await OTP.updateOne({otp})
  res.send({
      otp
   })
console.log(updateOtp)
}catch(error){
    console.log('failed')
   }
   await OTP.deleteOne({otp})
});

module.exports = {
  OtpRouter,
  sendOTP,
};

// // (email && subject && message)

// const userExist = await OTP.findOne({email})
// if(userExist){
    //       if(updateOtp){
        //           res.send({
            //              // email,
//               otp,
//              // date
//           })
//       }

//   }else{
    //      throw new Error;
    //   }
    
    // if(!email){
        //    throw new Error ('Please enter the required values')
// ue
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

// try{
    //     if(otp){
        //         const userExist = await OTP.findOne({email})
//         if(userExist){
//             const updateOtp =  await OTP.findOneAndUpdate({otp})
//               if(updateOtp){
//                   res.send({
//                     //   email,
//                       otp,
//                       // date
//                   })
//               }

//           }else{
//              throw new Error;
//           }
//     }else{
//         throw new Error('invalid token')
//     }
//     await OTP.deleteOne({otp})

// }catch(error){
//     throw new Error({error:'invalid access'})
// }

    // if(error){
    //     console.log("error:", error)
    //     // throw new Error()
    // }else{
    //     res.send(info.response)
    // }