const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userRolesSchema = new Schema ({
 name:{
    type: String,
    required: true
}
})

module.exports = mongoose.model('role', roleSchema)