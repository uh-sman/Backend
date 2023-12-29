const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userRequestSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    timestamp: true,
})




module.exports = mongoose.model('limit', userRequestSchema)