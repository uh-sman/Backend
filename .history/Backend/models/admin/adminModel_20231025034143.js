const mongoose = require('mongoose')
const Schema = mongoose.Schema


const superAdminSchema = new Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    password:{
        type:String,
        required:[true, 'password are required for admins']
    }
})