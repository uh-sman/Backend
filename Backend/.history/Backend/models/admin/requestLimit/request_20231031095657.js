const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userRequestSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    timestamp: Date.now,
})




module.exports = mongoose.model('request', userRequestSchema)