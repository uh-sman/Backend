const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const SuperAdmin = require('../models/admin/adminModel')
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
});

const admin = async (req,res,next) => {
  // const {email} = req.body
  // const {email} = req.body
  // const userExists = await User.findOne({ email })
  // res.send(userExists)
//   if(userExists.isVerified === true){
//     // res.send('true')
//     next()
//   }
// else{
//   res.status(401)
//   throw new Error('not authorized as an admin')
// }

if(req.user && req.user.isAdmin){
  next()
}
else{
  res.status(401);
  throw new Error('Not authorized ')
}
}
// async function superAdmin  (userRole) {
//   return (req, res, next) => {
//     // const user = req.role;
//     const {role} = req.body.role
//     const userRole = await User.findOne()

//     if(user && user.role === userRole){
//       next()
//     }else{
//       res.status(403).send('Access denied not authorized')
//     }
//   }
// }

const superAdmin = asyncHandler ( async (req, res, next) => {
  // const userRole = await User.findOne({email : req.body.email})
  // console.log(req.body.email)
  let userRole = 'superAdmin'
  const user = req.body
  if(user && user.role === userRole){
    next()
  }else{
    res.status(403).send('Access denied not authorized')
    // res.status(403).send('Access not authorized')
  }
})

module.exports = { protect, admin , superAdmin}

