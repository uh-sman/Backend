const SuperAdmin = require("../../../models/admin/adminModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../../../models/userModel");
const { admin } = require("../../../middleware");
const Token = require("../../../models/token/token");
const crypto = require("crypto");
const bcryptSalt = process.env.BCRYPT_SALT;
const JWT_SECRET = process.env.JWT_SECRET;
const superAdminRegister = async (data) => {
  const { name, password, email, role } = data;
  let sRole = "superAdmin";
  const adminExists = await SuperAdmin.findOne({ name, role: sRole });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findOne({ email, role: sRole });
    if (adminExists && user && adminExists.role && user.role === sRole) throw new Error("cannot create a new Admin");
  //   if (user && user.role === "superAdmin") {
  //     throw new Error("failed cannot create new Admin");
  //   }
// const id = adminExists._id
//   const confirmationToken = tokenRequest(adminExists._id);

//   if (confirmationToken) {
//     return;
//   } else {
//     return (data = {
//       message: "failed",
//     });
//   }

    const admin = await SuperAdmin.create({
      email: email,
      name: name,
      password: hashedPassword,
      // token:
    })

    await User.create({
        userId:admin._id,
        email: email,
        name: name,
        password: hashedPassword,
        role: sRole,
      });
    const token = JWT.sign({ id: admin._id }, JWT_SECRET);
    //   const updateRole = await user.updateOne({ role: "superAdmin" });
    return (data = {
      message: "Admin created successfully",
      id: admin._id,
      name: admin.name,
      //   role:role,
      token: token,
      // updateRole,
      //   token:token
    });
};
const superAdminLogin = async (data) => {
  const { name, password, email } = data;

  const user = await SuperAdmin.findOne({ name });
  if (!user) throw new Error("not authorized as an admin");
  const token = JWT.sign({ _id: user._id }, JWT_SECRET);

  //  if(userExists) {
  //     return(userExists)
  //  }
  if (user && (await bcrypt.compare(password, user.password))) {
    return (data = {
      _id: user._id,
      name: user.name,
      token: token,
    });
  }
  // return (data = {
  //     name:"usman",
  // })
};   
const tokenRequest = async (data) => {
//   let token;
//   token = id;
  const { email } = data
//   const user = SuperAdmin.findOne({ email })
const user = await SuperAdmin.findOne({ email })
  if(!user) throw new Error('cannot authenticate')
//   console.log(id,token)
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let confirmToken = crypto.randomBytes(32).toString("hex");
  const salt = bcrypt.genSalt(10);
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `http://localhost:4000/api/superAdmin/confirmationToken?=${confirmToken}&id=${user._id}`

  // const {  } = data
  // const tokenCode =
  return link
};

const tokenConfirmation = async (data) => {
 const { token, userId } = data

 let confirmToken = await Token.findOne({ userId })
 if(confirmToken && confirmToken.createdAt > Date.now) throw new Error('invalid or expired token')

 const tokenValid = bcrypt.compare(token , confirmToken.token)

 if(!tokenValid) throw new Error('Invalid or expired token');
// update the verified or confirmation path in the schema
}
module.exports = {
  superAdminRegister,
  superAdminLogin,
  tokenRequest,
  tokenConfirmation
};

// try {
//     const salt = bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await User.findOne({ name: username });

//     if (userRole.role === "superAdmin") throw new Error("action not allowed");

//     const admin = new SuperAdmin({
//         // id:user._id,
//         username,
//         password: hashedPassword,
//       });
//       await admin.save();
//       const token = JWT.sign({ id: admin._id }, JWT_SECRET);
//       const updateRole = await user.updateOne({ role: "superAdmin" });
//       return ({
//       message: "Admin created successfully",
//       id:admin._id,
//       username: admin.username,
//       // updateRole,
//       token:token
//     })
//   } catch (error) {
//     console.log(error);
//   }

// const user = await User.findOne({ name });
// if (user.role === "superAdmin") throw new Error("action not allowed");

// const admin = new SuperAdmin({
//     // id:user._id,
//     name,
//     password: hashedPassword,
//     maxLimit: 1,
//   });
//   await admin.save();

//    return {
//     message:"hello world",
//     id:user._id,
//     name: user.name,
//     // role:role,
//    }

//   if(user.role === 'admin') {
//     throw new Error('not authorized as admin')
//   }
//    if(user.role === 'user') {
//     await user.updateOne({role: 'superAdmin'})
//    }
