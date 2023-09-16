const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();

const router = express.Router()

router.post('/',(req,res) => {
    const {} = req.body
    res.send({message:"successful"})
})

module.exports = router