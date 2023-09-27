const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    // host: "smtp-mail.gmail.com",
    service: "gmail",
    auth:{
        user: process.env.AUTH_EMAIL,
        password:process.env.AUTH_PASSWORD
    }
})


module.exports = transporter