const asyncHandler = require("express-async-handler");
const OTP = require("../models/otp/index");
const otpGenerator = require("otp-generator");
const generateOTP = require("../utils/index");
const transporter = require("../email/index");
const User = require("../models/userModel");
const express = require("express");
const SMTPTransport = require("nodemailer/lib/smtp-transport");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
// const token =  Math.floor(100000 + Math.random() * 9000);
const token = Math.floor(Math.random() * 100000 + 1);
// const token = otpGenerator.generate(6, { upperCase: false, specialChars: false , alphabets: false});
const OtpRouter = asyncHandler(async (req, res) => {
  try {
    res.send({
      token,
    });
  } catch (error) {
    res.send({ error });
  }
});

const sendOTP = asyncHandler(async (req, res) => {
  //   console.log("log request out",req)
  const { from, to,subject,text} = req.body
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
     to,
    subject,
    html: `<p>Your otp is  ${token}</p>`,
    text,
    expires:3599,
    // otp:`Your OTP is `
  };
  // const data = {from,to,subject,text}
  //   const { email, subject, message, duration = 0.1, createdAt, otp } = req.body;
  const response = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error" + error);
    } else {
      console.log("successful" + info.response);
    }
  });
  res.send("successful");

//   res.send({response})

    // res.json(r)
  //    await OTP.deleteOne({otp})
});

// sendOTP()

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

//   if(createOtp){
//     try{
//         //    let mail = await transporter.sendMail(mailOptions,function(error,info){
//         // })
//         let mail = await transporter.sendMail({
//             from: process.env.AUTH_EMAIL,
//             to: email,
//             subject:  `OTP CODE FROM ${email}`,
//             html: `<h1>Your otp is${otp}</h1>`
//         })
//         res.json({
//               email,
//               otp,
//             });
//             console.log(mail)
//         }catch(err){
//             console.log(err)
//             throw new Error("token does not exist");
//         }
//   }

//   const info = await transporter.sendMail({
//     from: process.env.AUTH_EMAIL,
//     to: email,
//     subject:  `OTP CODE `,
//     html: `<h1>Your otp is${otp}<h1>`
// })

//         const { email, otp } = req.body;
//   try{
//     const mailOptions = {
//         from: process.env.AUTH_EMAIL,
//         to: 'osmanejamal29@gmail.com',
//         subject:  `OTP CODE`,
//         html: '<h1>whoa it works</h1>'
//       }
//       transporter.sendMail( mailOptions, function(error,info){
//         if(error){
//             console.log("mail error",error)
//             return transporter.close()
//         }else{
//             console.log('message sent' + info.response)
//             return transporter.save()
//         }
//     })
//     await OTP.create({
//         email,
//         otp,
//       });
//       res.send({
//         email,
//         otp
//       })

//     const userExists = await OTP.findOne({email})

//     if(userExists){
//         try{
//             await OTP.updateOne({otp})
//             if(token === otp){
//                 console.log('successfully logged in')
//                 res.status(400).send({message:"successful"})
//             }else{
//                 console.log('failed')
//             }
//           console.log(updateOtp)
//           }catch(error){
//               console.log('failed')

//              }

//     }

//   }catch(err){
//     console.log(err)
//   }
