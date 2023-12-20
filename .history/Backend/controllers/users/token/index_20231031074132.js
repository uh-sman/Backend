const SuperAdmin = require('../../../models/admin/adminModel')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const bcryptSalt = process.env.BCRYPT_SALT
const Token = require('../../../models/token/token')
const Tokens = async (data) => {
const { email } = data
// const user = await SuperAdmin.findOne({ email })
// if(!user) throw new Error ('cannot authenticate')
// let token = await Token.findOne({ userId: user._id })
// if(token) await token.deleteOne()

let tokens = Math.floor(1000 + Math.random() * 900000)
// let confirmToken = crypto.randomBytes(32).toString("hex");

// const tokenCode = await bcrypt.hash(tokens, Number(bcryptSalt))
// const salt = await bcrypt.genSalt(10)
// const tokenCode = await bcrypt.hash(tokens)

// await new Token({
//     userId: user._id,
//     token: hashedToken,
//     createdAt: Date.now()
// }).save()

return (data = {
    message: 'success',
    email: email,
    token: tokens
    // token: tokenCode,
})
// const link = `http://localhost:4000/confirmCode?token=${tokenCode}&id=${user._id}`
// // token = 
// return link;
// const hashedToken = await bcrypt.hash(token)
}

module.exports = Tokens