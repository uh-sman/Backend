const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const registerUser = (req,res) => {
    const {name,surname} = req.body
    res.send(req.body)
}
const loginUser = (req,res) => {
    const {name,surname} = req.body
    res.send(req.body)
}
const profile = (req,res) => {
    const {name,surname} = req.body
    res.send(req.body)
}


module.exports = {
    registerUser,
    loginUser,
    profile
}