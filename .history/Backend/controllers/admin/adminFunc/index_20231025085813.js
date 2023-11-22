const SuperAdmin = require("../../../models/admin/adminModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../../../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
const superAdminRegister = async (data) => {
  const { name, password } = data;

  const adminExists = await SuperAdmin.findOne({ name });
  if (adminExists) throw new Error("not authorized as superAdmin");
  const salt = await  bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); 
  const admin = await SuperAdmin.create({
    name: name,
    password: hashedPassword,
    // token:
  })
        // const user = await User.findOne({ name });
        // if (user.role === "superAdmin") throw new Error("action not allowed");
    
        // const admin = new SuperAdmin({
        //     // id:user._id,
        //     name,
        //     password: hashedPassword,
        //     maxLimit: 1,
        //   });
        //   await admin.save();
          const token = JWT.sign({ id: admin._id }, JWT_SECRET);
        //   const updateRole = await user.updateOne({ role: "superAdmin" });
          return( data = {
          message: "Admin created successfully",
          id: admin._id,
          name: admin.name,
          token:token
          // updateRole,
        //   token:token
        })
//    return {
//     message:"hello world"
//    }
};
const superAdminLogin = async (data) => {
    const { name, password } = data

    const userExists = await SuperAdmin.findOne({ name })
    if(!userExists) throw new Error('not authorized as an admin')
     const token = await JWT.sign({_id: userExists._id}, JWT_SECRET)

    //  if(userExists) {
    //     return(userExists)
    //  }
    if(userExists && (await userExists.matchPassword(password))){
        return (data = {
            _id:userExists._id,
            name: userExists.name,
            token:token,
        })
    }
// return (data = {
//     name:"usman",
// })
}
module.exports = {
    superAdminRegister,
    superAdminLogin
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