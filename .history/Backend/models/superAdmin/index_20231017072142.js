const mongoose = require('mongoose')


const superAdminSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'Please add a name'],
        },
        email: {
          type: String,
          required: [true, 'Please add an email'],
          unique: true,
        },
        isSuperAdmin:Boolean 
      },
      {
        timestamps: true,
      }
)

module.exports = mongoose.model('superAdmin', superAdminSchema)
