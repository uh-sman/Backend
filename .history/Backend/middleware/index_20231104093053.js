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

const admin = asyncHandler(async (req,res,next) => {
if(req.user && req.user.isAdmin){
  next()
}
else{
  res.status(401);
  throw new Error('Not authorized ')
}
})

const superAdmin = asyncHandler ( async (req, res, next) => {
  // if(req.superAdmin.role.superAdmin){
  //   next()
  // }else{
  //   res.status(203)
  //   res.send('failed')
  // }
  let userRole = 'superAdmin'
  console.log(req.query)
  // const userRoles = await SuperAdmin.find({email: req.body.email, role: userRole})
  const userRoles = await SuperAdmin.findById()
  const user = req.body
  if(userRoles && userRoles === userRole){
    next()
  }
  else{
    res.status(403).send('Access denied not authorized')
  }
})

module.exports = { protect, admin , superAdmin}

