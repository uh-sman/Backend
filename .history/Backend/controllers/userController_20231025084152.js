const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Profile = require("../models/profileModels");
const userVerification = require("../models/userVerification/userverification");
const nodemailer = require("nodemailer");
const crypto = require("crypto")
const transporter = require("../email/index");
const { v4: uuidv4 } = require("uuid");
const {
  register,
  deleteUser,
  login} = require('./users/index')
const {
resetPassword,
requestPasswordReset
} = require('./passwordReset/index')
const bcryptSalt = process.env.BCRYPT_SALT;
const Joi = require("joi");
const url = require('url')
// const token = Math.floor(100000 + Math.random() * 100000 + 1);
const Token = require('../models/token/token')
function fullUrl(req){
  return url.format({
    host: req.get('host')
  })
}
let otpGenerator =  Math.floor(1000 + Math.random() * 9000)

let isVerified;

const authUser = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error, value } = schema.validate(req?.body);
  if (error) {
    res.status(401);
    throw new Error("Email and password is required");
    // throw new Error('Req body require')
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      university:user.university,
      // isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// TODO: REGISTER
const registerUser = asyncHandler( async (req, res, next) => {
const registerService = await register(req.body)
 return res.json(registerService)
  // next();
  // sendOTP()

  // res.send(req.body)
});

// TODO:LOGINpassword
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password, otp } = req.body;
//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       message:"LOGIN SUCCESSFUL",
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }
// });

const loginUser = asyncHandler (async (res, req, next) => {
  const loginService = await login(req.body)
  return res.json(loginService)
})

const deleteUserController = asyncHandler(async (req,res) => {
  const deleteUserRegister = await deleteUser(req.params,req.body)
  return deleteUserRegister;
})
// TODO:PROFILE
const profile = asyncHandler(async (req, res) => {
  const { Firstname, Lastname, Dob, phoneNo, address } = req.body;
  if (!(Firstname && Lastname && Dob && phoneNo && address )) {
    res.status(500);
    throw new Error("all fields are required");
  }
  const profileExists = await Profile.findOne({ Lastname }).select("-password")
  if (profileExists) {
    res.status(500);
    throw new Error(`user with username ${Lastname} already exists`);
  }
  const data = {
    Firstname,
    Lastname,
    Dob,
    phoneNo,
  };
  const profile = await Profile.create(data);
  res.send({ profile });
});
// TODO:GET PROFILE
const getProfile = asyncHandler(async (req, res) => {
  const get = await Profile.findOne({ Lastname: "Umar" });
  res.send({ get });
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
// TODO:VERIFY
const verify = asyncHandler(async (req, res) => {
  const { phoneNo, otp } = req.body;
  const phoneInDatabase = await Profile.findOne({ phoneNo: phoneNo });
  if (!phoneInDatabase) {
    console.log("no phone number");
    throw new Error("failed with phoneNo");
    // return null
  }
  // if(phoneNo === phoneInDatabase){
  //   res.send('true')
  // }
  await Profile.findOneAndUpdate({ isVerified: true });
  //  Profile.save()
  res.send(phoneInDatabase);
});
// TODO:VERIFY PIN
const getVerifyPin = (req, res) => {
  let {userId, uniqueString} = req.params
 UserActivation.find({userId}).then((result) => {
  if (result.length >  0) {
    const {expiresAt} = result[0]
    if (expiresAt < Date.now()) {
      console.log('link has expired')
      userVerification.deleteOne({userId}).then((res) => {}).catch((err) => {
        console.log(err)
      })
    }
  }else{
    let message = 'An error occurred while verifying'
    res.redirect(`/verify/verified/errors=true&message=${message}`)
  }
 }).catch((error) => {
  console.log(error);
  let message = 'An error occurred while verifying'
  res.redirect(`/verify/verified/errors=true&message=${message}`)
 })
  // if(!findUserVerification){
  //   throw new Error;
  //   let
  // } 
  // console.log(token);
  // res.send({ otp: token });
res.send('getVerifyPin')
};

// TODO:UpdatePassword
const updatePassword = asyncHandler(async (req, res ,next) => {
  const { email, password , _id} = req.body;
  // const {email,password } = req.

  const userExists = await User.findOne({ email });
  if (!userExists) {
    console.log('user does not exist')
    throw new Error("oops cannot reset password for user that does not exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // const updated = await User.updateOne({password: hashedPassword})
  // if(!updated){
  //   throw new Error('failed to update password')
  // }

  //  res.send(userExists)
  User.deleteOne({password}).then((success,error) => {
    if(error){
      res.json('failed to update')
    }
    if(success){
      User.updateOne({ password: hashedPassword}).then((response)=>{
        res.json('successfully updated' + response)
         }).catch((error) => {
          console.log(error)
          throw new Error('failed to updatePassword')
         })  
    }
  }).catch((error) => {

    throw new Error('failed' + error)
  })

});

const resetPasswordRequestController = asyncHandler(async (req,res,next) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
    )
 return res.json(requestPasswordResetService)
})

const resetPasswordController = asyncHandler(async (req,res,next) => {
  console.log("request coming in", req.query)
  try {
    
    const resetPasswordService = await resetPassword(
      req.query.id,
      req.query.token,
      req.query.password,
      )
      // return (resetPasswordService);
      res.send('password reset successful')
      // return res.json({message: 'successful reset'})
    } catch (error) {
      throw new Error(error)
    }
})
// const reset = await Use


//   module.export = {generateToken}
// zhodbod88@gmail.com
const verificationEmail = async ({ _id, email }, res) => {
  const currentUrl = "http://localhost:4000/";

  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to,
    subject,
    // html: `<p>${text}</p>`,
    html: `<p>Verify your email address to complete the signup into your account.</p> <p>Click <a href=${
      currentUrl + "/verify" + _id + "/" + uniqueString
    }>here</a> to verify</p>`,
    // html: `<a href = '${url}'>${text}</a>`,
    // text,
    expires: 300,
    // otp:`Your OTP is `
  };
  
  const salt = await bcrypt.genSalt(10);
  const hashedUniqueString = await bcrypt.hash(uniqueString, salt);
  if (!hashedUniqueString) {
    res.send("failed");
  }
  const newVerification = new userVerification({
    userId: _id,
    uniqueString: hashedUniqueString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 300000,
  });
  newVerification.save();
  if (!newVerification) {
    res.send("failed");
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error" + error);
    } else {
      console.log("successful" + info.response);
    }
  });
};

// const changeRole = asyncHandler( async (req,res,next) => {
// })

module.exports = {
  registerUser,
  loginUser,
  profile,
  getProfile,
  verify,
  getVerifyPin,
  updatePassword,
  resetPasswordRequestController,
  resetPasswordController,
  deleteUserController
  // OtpRouter
};

// const verified = await Profile.updateOne({isVerified: true})

// //  const verified = await Verification.
// // if(otp !== token ){
// //   throw new Error("wrong otp failed")
// // }

//  if(!verified){
// console.log('failed to verify phoneNo')
// return null
//  }else{
//   res.send(phoneNo)
//  }

// update password

// let token = awaitT

// Profile.find({email}, function(error,data){
//   if(error){
//     throw error;
//   }
//   if(data.length){

//   }
// })
// const userExists = await Profile.findOne({email})
// res.send({userExists})
// res.send({userExists})
// if(userExists){
//   try{
//  console.log('user exists')
// //  res.send('user exists')
//   }catch(error){
//    console.log('error' + error)
//   }
// }else{
//   res.send({message:'failed'})
// }

// if(userExists){
//    await Profile.updateOne({password})
//    res.send('password successfully updated')
// }else{
//   throw new Error('user does not exist')
// }

//  res.send({message:"route is working"})

// const sendOTP = asyncHandler(async (req, res) => {
//   //   console.log("log request out",req)
//   const url = 'http://localhost:4000/verify/${generateToken}'
//   const { from, to,subject,text} = req.body
//   const mailOptions = {
//     from: process.env.AUTH_EMAIL,
//      to,
//     subject,
//     // html: `<p>${text}</p>`,
//     html: `<a href = '${url}'>${text}</a>`,
//     // text,
//     expires:300,
//     // otp:`Your OTP is `
//   };
//   // const data = {from,to,subject,text}
//   //   const { email, subject, message, duration = 0.1, createdAt, otp } = req.body;
//   const response = transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("error" + error);
//     } else {
//       console.log("successful" + info.response);
//     }
//   });
//   res.send("successful");

// //   res.send({response})

//     // res.json(r)
//   //    await OTP.deleteOne({otp})
// });


// res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000',"https://dcanestate.onrender.com"]);
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// res.setHeader('Access-Control-Allow-Credentials', true);
// next();



