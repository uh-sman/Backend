const bcrypt = require('bcryptjs')
const Token = require('../../models/token/token')
const User = require('../../models/userModel')
const crypto = require('crypto')
const transporter = require('../../email/index')
const asyncHandler = require('express-async-handler')





const requestPasswordReset = async (email) => {
    // const {email,password} = req.
    const user = await User.findOne({ email })
    if(!user) throw new Error('oops user does not exist')
    let token = await Token.findOne({ userId: user._id })
    if(token)  await token.deleteOne()
   
  
    let resetToken = crypto.randomBytes(32).toString('hex')
    // const hash = await bcrypt.hash()
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(resetToken, salt);
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))
    res.send(hash)
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now()
    }).save()
    const link = `http://localhost:4000/forgot-password?token=${resetToken}&id=${user._id}`
    // sendEmail(user.email,'You requested to reset passwords',{name:user.name,link})
    // return link;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
       to:user.email,
      subject:"Password reset request",
      // html: `<p>${text}</p>`,
      text:`Hi ${user.name}`,
      html: `<a href = "${link}">reset password</a>`,
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
    return link;
    // res.send(token)
  }

const resetPassword = async (userId,token,password) => {
    // const {userId,token,password} = req.body
    let passResetToken = await Token.findOne({ userId })
  
    if(!passResetToken){
      throw new Error('Invalid or expired password reset token')
    }
  
    const isValid = await bcrypt.compare(token,passResetToken.token)
  
    if(!isValid){
      throw new Error('Invalid or expired password reset token')
    }
  
    const hash = await bcrypt.hash(password,Number(bcryptSalt))
  
    await User.updateOne(
      {
      _id:userId
    },
    {$set: { password:hash }},
    {new:true}
    )
  
    const user = await User.findById({_id: userId})
  
    sendEmail(
      user.email,
      "Password Reset successful",
      {
        name:user.name
      }
      )
      await passResetToken.deleteOne()
      return true
  }


  module.exports = {
    resetPassword,
    requestPasswordReset
}