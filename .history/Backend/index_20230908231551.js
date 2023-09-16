const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 4000

app.get('/',(req,res) => {
    res.send({message:'router'})
})

app.listen(PORT, () => {
  console.log({message:"hello"})
})