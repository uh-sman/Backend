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
<<<<<<< HEAD:Backend/.history/models/admin/adminModel_20231108011006.js
        required:[true,'username is required'],
        unique:[false, 'admin with username already exists']
=======
        required:[true,'firstname is required'],
        unique:[false, 'admin with firstname already exists']
>>>>>>> a62fa0b843429228bb5a747b0c081c693bafbc3f:.history/models/admin/adminModel_20231108011006.js
    },
    lastname:{
        type:String,
        required:[true,'lastname is required'],
<<<<<<< HEAD:Backend/.history/models/admin/adminModel_20231108011006.js
        unique:[false, 'admin with username already exists']
=======
        unique:[false, 'admin with lastname already exists']
>>>>>>> a62fa0b843429228bb5a747b0c081c693bafbc3f:.history/models/admin/adminModel_20231108011006.js
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
<<<<<<< HEAD:Backend/.history/models/admin/adminModel_20231108011006.js
=======
    photo: String,
>>>>>>> a62fa0b843429228bb5a747b0c081c693bafbc3f:.history/models/admin/adminModel_20231108011006.js
    isVerified:{
        type:Boolean,
        default:false
    },
<<<<<<< HEAD:Backend/.history/models/admin/adminModel_20231108011006.js
    max: Number,
})

module.exports = mongoose.model('superAdmin', superAdminSchema)
=======
})   

module.exports = mongoose.model('superAdmin', superAdminSchema)  
>>>>>>> a62fa0b843429228bb5a747b0c081c693bafbc3f:.history/models/admin/adminModel_20231108011006.js
