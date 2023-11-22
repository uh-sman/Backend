const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const userRolesSchema = new Schema ({
//  name:{
//     type: String,
//     required: true
// }
// })

const RoleSchema = new Schema ({
    roleId: {
        type:String,
        unique: true,
        required:[true, 'Role Id is required'],
    },
    type:{
        type:String,
        unique:true,
        required:[true, 'Role Id is required']
    },
    rights:{
        rights:[
            {
                name:String,
                path:String,
                url:String,
            }
        ]
    }
})

// userRolesSchema.

module.exports = mongoose.model('role', roleSchema)