const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Profile = require("../models/profileModels");
// const Verification = require('../models/profileModels')
// const generateToken = require('../token/generateToken')
const userVerification = require("../models/userVerification/userverification");
// const { sendOTP } = require("../controllers/otpController");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const token = Math.floor(100000 + Math.random() * 100000 + 1);

// let otpGenerator =  Math.floor(1000 + Math.random() * 9000)

let isVerified;
// TODO: REGISTER
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  // check if userExists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // HASH PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // CREATE USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  // next();
  // sendOTP()

  // res.send(req.body)
});

// TODO:LOGIN 
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// TODO:PROFILE
const profile = asyncHandler(async (req, res) => {
  const { Firstname, Lastname, Dob, phoneNo } = req.body;
  if (!(Firstname && Lastname && Dob && phoneNo)) {
    res.status(500);
    throw new Error("all fields are required");
  }
  const profileExists = await Profile.findOne({ Lastname });
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
   await  Profile.findOneAndUpdate({  isVerified: true });
  //  Profile.save()
   res.send(phoneInDatabase)
  // if (verified) {
  //   res.send(phoneInDatabase)
  //   // throw new Error({message:"failed to verify phoneNo"})
  //   // console.log("failed to verify phoneNo");
  //   // return null;
  // }
  // if(!verified){
  //   throw new Error('failed')
  // }

  //  await Profile.updateOne({ isVerified: true },function(err,success){
  //   if(err){
  //     throw new Error({message:"failed to verify"})
  //   }
  //   if(success){
  //     res.send(phoneInDatabase)
  //   }
  //  });
  // if (!verified) {
  //   throw new Error({message:"failed to verify phoneNo"})
  //   // console.log("failed to verify phoneNo");
  //   // return null;
  // }
  // res.send(phoneInDatabase);
});
// TODO:VERIFY PIN
const getVerifyPin = async (req, res) => {
  console.log(token);
  res.send({ otp: token });
};



// TODO:UpdatePassword
const updatePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    throw new Error("User does not exist");
  }
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    throw new Error("this password already exists in database");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // res.send(hashedPassword)
  const updatedPassword = await User.findOneAndUpdate({ password: hashedPassword });
  if (!updatedPassword) {
    throw new Error();
  }
  res.send(userExists)
  //  else {
  //   res.send(userExists);
  // }
  // res.send('failed')
});
//   module.export = {generateToken}


const sendOTP = asyncHandler(async (req, res) => {
  //   console.log("log request out",req)
  const url = 'http://localhost:4000/verify/${generateToken}'
  const { from, to,subject,text} = req.body
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
     to,
    subject,
    // html: `<p>${text}</p>`,
    html: `<a href = '${url}'>${text}</a>`,
    // text,
    expires:300,
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
module.exports = {
  registerUser,
  loginUser,
  profile,
  getProfile,
  verify,
  getVerifyPin,
  updatePassword,
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
