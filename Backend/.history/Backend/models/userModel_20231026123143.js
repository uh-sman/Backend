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
      required: [true, 'please enter a username'],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'please enter your email'],
    },
    password: {
      type: String,
      required:[true,'please enter your password']
    },
    // role:{
    //   type:String,
    //   required:[true, 'role is required to access certain features'],
    //   default:'user'
    // }
    role:{
      // type:mongoose.Schema.Types.ObjectId,
      type:String,
      ref:'role',
      enum :['superAdmin', 'admin', 'user'],
       default: 'user' ,
       required:[true ,'role required']
    }
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


// roles:[
//   {
//     type: mongoose.Schema.ObjectId,
//     ref:"Role"
//   }
// ]