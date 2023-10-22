const bcrypt = require("bcryptjs");
const Token = require("../../models/token/token");
const User = require("../../models/userModel");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const bcryptSalt = process.env.BCRYPT_SALT;

const transporter = require("../../email/index");

const requestPasswordReset = async (email) => {
  // const {email,password} = req.
  const user = await User.findOne({ email });
  if (!user) throw new Error("oops user does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  

  let resetToken = crypto.randomBytes(32).toString("hex");
  const salt = bcrypt.genSalt(10);
  const hash = await bcrypt.hash(resetToken, Number(salt));
  // const hash = await bcrypt.hash()
  // const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(resetToken, salt);
  // res.send(hash)
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();
  const link = `http://localhost:4000/api/users/forgot-password-reset?token=${resetToken}&id=${user._id}`;
  // sendEmail(user.email,'You requested to reset passwords',{name:user.name,link: link}, "./template/api/users/forgot-password-request.handlebars")
  // return link;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Password reset request",
    // html: `<p>${text}</p>`,
    text: `Hi ${user.name}`,
    html: `<a href = "${link}">reset password</a>`,
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
  return link;
  // res.send(token)
};

const resetPassword = async (userId, token, password) => {
  // const {userId,token,password} = req.body
  console.log("userid", userId)
  console.log("token", token)
  console.log("password", password)
  let passwordResetToken = await Token.findOne({ userId });

  console.log("passwordResetToken", passwordResetToken)
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    // console.log("failed");
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    {
      _id: userId,
    },
    { $set: { password: hash, resetToken: "" } },
    { new: true }
  );

  const user = await User.findById({
    _id: userId,
  });

  console.log("user details", user)
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Password Reset Successfully",
    // html: `<p>${text}</p>`,
    text: `Hi ${user.name}`,
    html: `<p>Tour password has been changed successfully</p>`,
    // html: `<a href = "${link}">reset password</a>`,
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
  //   sendEmail(
  //     user.email,
  //     "Password Reset successful",
  //     {
  //       name: user.name,
  //     },
  //     "/template/api/users/forgot-password-reset.handlebars"
  //   );
  await passwordResetToken.deleteOne();
  return {
    message: "Password reset successfully",
    user: user._id,
  }
  // return true;
};

module.exports = {
  resetPassword,
  requestPasswordReset,
};
