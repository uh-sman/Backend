const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// const generateToken = require('../token/generateToken')

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
    const { email, password } = req.body
  res.send({ email, password })
    // Check for user email
    // const user = await User.findOne({ email })
  
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   res.json({
    //     _id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     token: generateToken(user._id),
    //   })
    // } else {
    //   res.status(400)
    //   throw new Error('Invalid credentials')
    // }
  })
const profile = (req,res) => {
    // const {name,surname} = req.body
    res.send({message:"successful"})
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
    profile
}