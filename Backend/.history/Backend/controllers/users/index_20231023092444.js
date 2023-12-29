const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;
const JWTSecret = process.env.JWT_SECRET;
const User = require("../../models/userModel");
const transporter = require('../../email/index')
const JWT = require('jsonwebtoken')
const Role = require('../../models/roles/roles')
// const register = async () => {
//   const { name, email, password, confirmPassword } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("please add all fields");
//   }

//   // check if userExists
//   let userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   let passwordCheck = password === confirmPassword;
//   if (passwordCheck === false) {
//     res.status(400).json({
//       // status: res.status(401),
//       message: "oops passwords don`t match",
//     });
//   }
//   // HASH PASSWORD

//   // const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // CREATE USER
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     isVerified: false,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }
// };


const register = async (data) => {
  // const {}
  const { password, confirmPassword, email, roleName, name } = data
  console.log('data' , password, confirmPassword, email, roleName, name )
  // console.log('data' , data )
    let user = await User.findOne({email: data.email})
    let user = await User.findOne({ email })
    if(user){
        throw new Error('User already exist',422)
    }
    
    let passwordCheck = password === confirmPassword

    if(!passwordCheck){
      throw new Error('passwords don`t match')
    }
    const role = await Role.findOne({ name: roleName })
    if(!role) {
      return {
        message: 'Role not found'
      }
    }
    user = new User({name, email, password, role: role._id. roleName})

    const token = JWT.sign({id: user._id}, JWTSecret)

    await user.save()

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
         to:user.email,
        subject:"SIGN UP SUCCESSFUL",
        // html: `<p>${text}</p>`,
        text:`Hi ${user.name}`,
        html: `<p>You have Successfully registered your email with DCAN</p>`,
        // text,
        expires:300,
        // otp:`Your OTP is `
      };
      transporter.sendMail(mailOptions,function (error, info) {
        if (error) {
          console.log("error" + error);
        } else {
          console.log("successful" + info.response);
        }
      })

    return(data = {
        userId: user._id,
        email:user.email,
        name: user.name,
        token: token,
    })
}

const deleteUser = async (email) => {
  const { id } = req.params
  const user = await User.findById({id}).select('-password')
  if(!user) throw new Error('User not found');

  await user.remove();
  return ('You have successfully deleted your account')
}

const signIn = async (res,email,password) => {
   
}

module.exports = {
    register,
    signIn,
    deleteUser
}