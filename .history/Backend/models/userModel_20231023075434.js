const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;
const bcrypt = require("bcryptjs");
// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please add a name'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Please add an email'],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Please add a password'],
//     },
//     isVerified:Boolean
//   },
//   {
//     timestamps: true,
//   }
// )

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    roles:[
      {
        type: mongoose.Schema.ObjectId,
        ref:"Role"
      }
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  
  // const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  // this.password = hash;
  // next();
});
module.exports = mongoose.model("user", userSchema);

// {
//   type: mongoose.Schema.Types.ObjectId,
//   ref:"userRolesSchema",
//   required:true
// }
// {
 
 
// },

// userRoles: [
//   {
//     user: {
//       // _id: mongoose.Schema.Types.ObjectId,
//       type: Number,
//       default: 2001,
//     },
//     superAdmin: {
//       type: Number,
//       default:Boolean,
//       limit: 1
//     },
//     Admin: {
//       accountAdmin: {
//         type: String,
//         default: Boolean,
//       } ,
//        listingsAdmin: {
//         type: String,
//         default: Boolean,
//       },
//     },
//   },
// ],