const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();

const router = express.Router()

router.post('/',(req,res) => {
    const {} = req.body
    res.send({message:"successful"})
})
router.post('/register',(req,res) => {
    const {} = req.body
    res.send({message:"register"})
})
router.get('/profile',(req,res) => {
    const {} = req.body
    res.send({message:"profile"})
})

module.exports = router