const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const registerUser = (req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }
    // res.send(req.body)
}
const loginUser = (req,res) => {
    const {name,surname} = req.body
    res.send(req.body)
}
const profile = (req,res) => {
    // const {name,surname} = req.body
    res.send({message:"successful"})
}


module.exports = {
    registerUser,
    loginUser,
    profile
}