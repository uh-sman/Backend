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
  const { firstname, password, email, lastname, phoneNo ,role } = data;
  let sRole = "superAdmin";
    const adminExists = await SuperAdmin.findOne({ role: { $gt: 3 } });


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({ email, role: sRole });
    if (adminExists)
      throw new Error(
        "cannot create new superAdmin only one SuperAdmin is allowed"
      );

    const admin = await SuperAdmin.create({
      firstname,
      lastname,
      email,
      phoneNo,
      password,
      // token:
    });
    // await User.create({
    //   userId: admin._id,
    //   email: email,
    //   name: name,
    //   password: hashedPassword,
    //   role: sRole,
    // });
    const token = JWT.sign({ id: admin._id }, JWT_SECRET);
    return (data = {
      message: "Admin created successfully",
      id: admin._id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      phoneNo: admin.phoneNo,
      role:admin.role,
      token: token,
    });
};
const superAdminLogin = async (data) => {
  const {  password, email } = data.body

  const user = await SuperAdmin.findOne({ email });
 
  return (data = {
  user
  })
};
const tokenRequest = async (data) => {
  let production = "https://dcanestate.onrender.com";
  const BASE_URL = production ? production : "http://localhost:4000";
  //   let token;
  //   token = id;
  const { email } = data;
  //   const user = SuperAdmin.findOne({ email })
  const user = await SuperAdmin.findOne({ email });
  if (!user) throw new Error("cannot authenticate");
  //   console.log(id,token)
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let confirmToken = crypto.randomBytes(32).toString("hex");
  const salt = bcrypt.genSalt(10);
  const hash = await bcrypt.hash(confirmToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `http://localhost:4000/api/superAdmin/confirmToken?token=${confirmToken}&id=${user._id}`;

  // const {  } = data
  // const tokenCode =
  return link;
};

const tokenConfirmation = async (token, userId, data) => {
  let confirmToken = await Token.findOne({ userId });
  if (!confirmToken) throw new Error("invalid or expired token");
  if (confirmToken && confirmToken.createdAt > Date.now)
    throw new Error("invalid or expired token");
  const tokenValid = bcrypt.compare(token, confirmToken.token);
  if (!tokenValid) throw new Error("Invalid or expired token");

  await SuperAdmin.updateOne(
    { _id: userId },
    { $set: { isVerified: true } },
    { new: true }
  );
  const user = SuperAdmin.findOne({ _id: userId });
  await confirmToken.deleteOne();
  return {
    message: "successful",
    token: token,
    userId: userId,
    isVerified: user.isVerified,
  };
};

const deleteAdmin = async (data) => {
  const user = await User.findById(data);

  return (data = {
    message: "User Successfully deleted",
    user,
  });
};

const getUserByAdmin = async (data) => {
  const user = await User.find();
  if (user) {
    return (data = {
      user,
    });
  } else {
    throw new Error("no user found");
  }
};

const createAdmin = async (data) => {
  const user = await User.findById(data);
  if (!user) throw new Error("user does not exist");
  if (user.role === "admin")
    throw new Error(`this user ${user.name} is already an admin`);
  await user.updateOne({ role: "admin" });
  return (data = {
    message: "SUCCESSFUL",
  });
};

const updateAdmin = async (data) => {
const { userId } = data.query
const updates = data.body

const updatedAdmin = await User.findByIdAndUpdate(userId, updates, { new: true })
if(!updatedAdmin) {
  return (data = {
    status: 404,
    message: 'Admin not found'
  })
}
else{
  return (data = {
    message: 'successful',
    status:200,
    updatedAdmin,
    // updates
  })
}
}
module.exports = {
  superAdminRegister,
  superAdminLogin,
  tokenRequest,
  tokenConfirmation,
  deleteAdmin,
  getUserByAdmin,
  createAdmin,
  updateAdmin
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

  // const adminExists = await SuperAdmin.findOne({ name }).$where({role:sRole}).gt(1)
    // const userCount = await SuperAdmin.countDocuments({role: 'superAdmin'})
    //   const userCount = SuperAdmin.countDocuments({role: sRole})
    //   if(adminExists && adminExists > 2) throw new Error('cannot create Admin')
    // if(adminExists.role === sRole){
    // if(userCount > 1) throw new Error('cannot create Admin')
    // }else{
    //     throw new Error('failed')
    // }
    //   if(userCount && userCount > 2) throw new Error('limit reached. Cannot create new superAdmin')
    //   if (adminExists && user && adminExists.role && user.role === sRole)
    //     throw new Error("cannot create a new Admin");