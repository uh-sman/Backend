const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Profile = require('../models/profileModels')
// const generateToken = require('../token/generateToken')
const userVerification = require('../models/userVerification/userverification')

const nodemailer = require('nodemailer');
const{ v4: uuidv4 } = require('uuid')
// let otpGenerator =  Math.floor(1000 + Math.random() * 9000)


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

const registerUser = asyncHandler(async (req,res) => {
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

    // res.send(req.body)
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password,otp } = req.body
    
  if(!otp){
    throw new Error('oops otp has expired, try again')
  }
  if(otp === otpGenerator){
    res.send('success')
  }
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
    const {Firstname,Lastname,Dob} = req.body
    if(!(Firstname&&Lastname&&Dob)){
      res.status(500)
      throw new Error("all fields are required")
    }
    const profileExists = await Profile.findOne({Lastname})
    if(profileExists){
      res.status(500)
     throw new Error(`user with username ${Lastname} already exists`)
    } 
   
    const profile = await Profile.create({
      Firstname,Lastname,Dob
    })
   
    if(profile){
    res.status(201).json({Firstname,Lastname,Dob})
    }
  
})
const getProfile =async(req,res)=>{
res.send("Hellooooooo")
}
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

//   module.export = {generateToken}

module.exports = {
    registerUser,
    loginUser,
    profile,
    getProfile,
    // OtpRouter
}