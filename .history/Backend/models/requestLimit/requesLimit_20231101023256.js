const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


// const userRequestSchema = new Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//     },
//     timestamp: true,
// })

const userRequestSchema = mongoose.Schema({
    userId:String,
    timestamp:Date
})


module.exports = mongoose.model('Request', userRequestSchema)