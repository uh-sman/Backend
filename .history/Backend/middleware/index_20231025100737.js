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

const superAdmin = asyncHandler (async (req, res, next) => {
  // const { email , name} = req.body
  if(req.body.name && req.user.user){
    next()
  }
else{
  res.send('failed')
}
  // if(req.body.name && (await SuperAdmin.findOne({name : req.body.name})) === true){
  //   console.log('true')
  //   next()
  // }
  // else{
  //   res.send('failed')
  // }
  // const AuthorizedUser = SuperAdmin.findOne({ name })
// console.log(name)
// const admin = SuperAdmin.findOne({ name })
  // res.send(AuthorizedUser)
  // res.json({admin})
  
  // if(AuthorizedUser.role=== 'superAdmin'){
  //   return next()
  // }
  // else{
  //   res.status(401);
  //   throw new Error('Not authorized')
  // }
  // if(req.user && req.user.superAdmin){
  //   next()
  // }else{
  //   // res.status(401);
  //   throw new Error('Not authorized')
  // }
})

module.exports = { protect, admin , superAdmin}

