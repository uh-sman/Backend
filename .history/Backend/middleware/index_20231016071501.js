const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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
  const {email} = req.body
  const userExists = await User.findOne({ email })
  // res.send(userExists)
  if(userExists.isVerified === true){
    // res.send('true')
    next()
  }
  if(!userExists.isVerified){
    throw new Error('not authorized as an admin')
  }
// else{
//   res.status(401)
//   throw new Error('not authorized as an admin')
  
// }
}

module.exports = { protect, admin }

