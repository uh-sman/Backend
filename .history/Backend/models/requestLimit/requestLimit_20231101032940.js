const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


// const userRequestSchema = new Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//     },
//     timestamp: true,
// })

const userRequestSchema = new mongoose.Schema({
    userId:{
        // type:String,
        type:mongoose.Schema.Types.ObjectId,
        ref:'token',
        required:true,

    },
    timestamp:Date
})


module.exports = mongoose.model('requestlimits', userRequestSchema)