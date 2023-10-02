const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Profile = require('../models/profileModels')
// const Verification = require('../models/profileModels')
// const generateToken = require('../token/generateToken')
const userVerification = require('../models/userVerification/userverification')
const {sendOTP} = require('../controllers/otpController')
const nodemailer = require('nodemailer');
const{ v4: uuidv4 } = require('uuid')
const token = Math.floor(100000 + Math.random() * 100000 + 1);

// let otpGenerator =  Math.floor(1000 + Math.random() * 9000)

let isVerified;
// const OtpRouter =asyncHandler(async(req,res) => {
//   try{
//       const {email,subject,message,duration} = req.body
//       const user = await User.findOne({email})
//       res.send({
//           // user,
//           otpGenerator,
//       })
//   }catch(error){
//       res.send({error})
//   }
// })

const registerUser = asyncHandler(async (req,res,next) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }

    // check if userExists 
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

// HASH PASSWORD

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // CREATE USER
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    });
    
    if(user) {
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
    next();
    sendOTP()

    // res.send(req.body)
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password,otp } = req.body
    
  // if(!otp){
  //   throw new Error('oops otp has expired, try again')
  // }
  // if(otp === otpGenerator){
  //   res.send('success')
  // }
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })
const profile = asyncHandler(async (req,res) => {
    const {Firstname,Lastname,Dob,phoneNo} = req.body
    if(!(Firstname&&Lastname&&Dob&&phoneNo)){
      res.status(500)
      throw new Error("all fields are required")
    }
    const profileExists = await Profile.findOne({Lastname})
    if(profileExists){
      res.status(500)
     throw new Error(`user with username ${Lastname} already exists`)
    } 
   const data = {
    Firstname,
    Lastname,
    Dob,
    phoneNo
  }
    const profile = await Profile.create(data)
   res.send({profile})
   
      
   
})
const getProfile = asyncHandler(async(req,res)=>{
 const get = await Profile.findOne({Lastname:'Umar'})
res.send({get})
})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
const verify = asyncHandler(async(req,res) => {
const {phoneNo,otp} = req.body
const phoneInDatabase = await Profile.findOne({phoneNo})
if(!phoneNo){
  console.log('no phone number')
  throw new Error('failed with phoneNo')
  // return null
}
// if(phoneNo === phoneInDatabase) {
//   res.send("phoneNo already exists in database, if you choose to update ?")
//   console.log("phoneNo already exists in database, if you choose to update ?")
// }

// if(phoneNo)
// if()
// if(otp === token){
//   res.send('successful')
// }
// else{
//   throw new Error('otp doesn`t match')
// }
// if(phoneNo && !otp){
//   throw new Error('failed')
// }

else{
const verified = await Profile.updateOne({isVerified: true})

//  const verified = await Verification.
// if(otp !== token ){
//   throw new Error("wrong otp failed")
// }
 if(!verified){
console.log('failed to verify phoneNo')
return null
 }else{
  res.send(phoneNo)
 }
//  await Profile.findOne({isVerified}).then

}
})
const getVerifyPin =async (req,res) => {
  console.log(token)
  res.send({otp:token})

}
//   module.export = {generateToken}

module.exports = {
    registerUser,
    loginUser,
    profile,
    getProfile,
    verify,
    getVerifyPin
    // OtpRouter
}

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