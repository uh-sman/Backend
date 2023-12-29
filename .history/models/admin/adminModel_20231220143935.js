const mongoose = require('mongoose')
const Schema = mongoose.Schema


const superAdminSchema = new Schema ({
    // id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:"user"
    // },
    firstname:{
        type:String,
        required:[true,'username is required'],
        unique:[false, 'admin with username already exists']
    },
    lastname:{
        type:String,
        required:[true,'lastname is required'],
        unique:[false, 'admin with username already exists']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:[true,'email already exists']
    },
    phoneNo:{
        type:String,
        required:[true, 'phoneNo is required'],
        unique:[true,'phoneNo already exists']
    },
    password:{
        type:String,
        required:[true, 'password are required for admins']
    },
    role:{
        type: String,
        ref:"user",
        default:'superAdmin'
    },
    images:{
        type:[String],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    max: Number,
})

module.exports = mongoose.model('superAdmin', superAdminSchema)  