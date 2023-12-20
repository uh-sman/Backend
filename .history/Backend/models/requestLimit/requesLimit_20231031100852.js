const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userRequestSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    timestamp: true,
})




module.exports = mongoose.model('requestlimit', userRequestSchema)