const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;
const JWTSecret = process.env.JWT_SECRET;
const cloudinary = require('cloudinary').v2;
const User = require("../../models/userModel");
const transporter = require('../../email/index')
const JWT = require('jsonwebtoken')
const rateLimitMiddleWare = require('../../middleware/requestLimitMiddleware')
// const Role = require('../../models/roles/roles')
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
  const { password, confirmPassword, email, roleName, name , avatar} = data.body
  console.log(data.body)
  // const imageFile = data.files.image
  // const imageFile = data.file

  // let form = new multiparty.Form({ maxFileSize: 10 * 1024 * 1024 })

  // form.parse(req, (err, fields, files) => {
  //   if(err) return err;
  //   let 
  // })
  // cloudinary.uploader.upload(imageFile.path, function(res){
  //   if(res.url) {
  //     return (data = {
  //       status:200,
  //       url:res.url
  //     })
  //   }else{
  //     console.log('error uploading to cloudinary')
  //   }
  // })
    let user = await User.findOne({ email })
    if(user){
        throw new Error('User already exist')
    }
    let passwordCheck = password === confirmPassword

    if(!passwordCheck){
      throw new Error('passwords don`t match')
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

  //  (async function run () {
  //   const result = await cloudinary.uploader.upload(avatar)
  //   console.log('Successfully uploaded')
  //   console.log(`Results: ${result.secure_url}`)
  //  })()

   const imageUpload = async () => {
    const result = await cloudinary.uploader.upload(avatar)
    console.log(result.secure_url, result.public_id)
   }

  // cloudinary.uploader.upload(avatar).then((result) => {
  //   console.log(`Result: ${result.secure_url}`)
  // }).catch((error) => {
  //   console.log(`Error: ${error}`)
  // })
     user = new User({
      name,
      email,
      password,
      role: roleName,
      avatar
      // profilePicture: imageFile ? imageFile.filename : null
    })
    console.log("Clinet request", (data.file ? data.file.filename : null))
     await user.save()

    const token = JWT.sign({ id: user._id }, JWTSecret)


    // const mailOptions = {
    //     from: process.env.AUTH_EMAIL,
    //      to:user.email,
    //     subject:"SIGN UP SUCCESSFUL",
    //     // html: `<p>${text}</p>`,
    //     text:`Hi ${user.name}`,
    //     html: `<p>You have Successfully registered your email with DCAN</p>`,
    //     // text,
    //     expires:300,
    //     // otp:`Your OTP is `
    //   };
      // transporter.sendMail(mailOptions,function (error, info) {
      //   if (error) {
      //     console.log("error" + error);
      //   } else {
      //     console.log("successful" + info.response);
      //   }
      // })
      // rateLimitMiddleWare(user._id)
      
    return(data = {
        userId: user._id,
        email:user.email,
        name: user.name,
        token: token,
        avatar: user.avatar.url
    })
    // return (data = {
    //   message: 'helooooooooo',
    //   imageFile:imageUpload,
    // })
}

const deleteUser = async (data) => {
  console.log('data', data)
  const user = await User.findByIdAndDelete(data)
  if(!user) throw new Error('User not found');
  return(data = {
    message:"Successful"
  })
}

const login = async (data) => {
   const { email, password } = data
   const user = await User.findOne({ email })
   if(!user) throw new Error('user does not exist')
   const token = JWT.sign({_id: user._id}, JWTSecret)
   // rateLimitMiddleWare(user._id)
   if(user && (await bcrypt.compare(password, user.password))){
    return (data = {
           message:"LOGIN SUCCESSFUL",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
    })
    
   }else{
    throw new Error('invalid credentials')
   }
}

module.exports = {
    register,
    login,
    deleteUser
}