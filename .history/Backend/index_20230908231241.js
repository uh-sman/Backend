const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();

const app = express()
const PORT = 4000

app.get('/user',(req,res) => {
    res.send({message:'router'})
})

app.listen(PORT, () => {
  console.log({message:"hello"})
})