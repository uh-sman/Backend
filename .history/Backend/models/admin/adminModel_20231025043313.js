const mongoose = require('mongoose')
const Schema = mongoose.Schema


const superAdminSchema = new Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:[true,'username is required'],
        unique:[true, 'admin with username already exists']
    },
    password:{
        type:String,
        required:[true, 'password are required for admins']
    },
    maxLimit: Number,
})

module.exports = mongoose.model('superAdmin', superAdminSchema)