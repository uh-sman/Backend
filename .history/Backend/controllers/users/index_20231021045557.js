const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;
const JWTSecret = process.env.JWT_SECRET;
const User = require("../../models/userModel");
const transporter = require("../../email/index");
const JWT = require("jsonwebtoken");
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

const register = async (
  name,
  email,
  password,
  confirmPassword
  //   superAdmin,
  //   Admin,
  //   users
) => {
  let userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exist", 422);
  }

  let passwordCheck = password === confirmPassword;
  if (!passwordCheck) throw new Error("passwords don`t match");
 const  user = new User.create({
    name,
    email,
    password,
    superAdmin: false,
    Admin: false,
  });

  const token = JWT.sign({ id: user._id }, JWTSecret);

  await user.save();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "SIGN UP SUCCESSFUL",
    // html: `<p>${text}</p>`,
    text: `Hi ${user.name}`,
    html: `<p>You have Successfully registered your email with DCAN</p>`,
    // text,
    expires: 300,
    // otp:`Your OTP is `
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error" + error);
    } else {
      console.log("successful" + info.response);
    }
  });

  return (user = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};

const signIn = async (res, email, password) => {};

module.exports = {
  register,
  signIn,
};
