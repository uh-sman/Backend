const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp-mail.gmail.com",
    // service: "gmail",
    port:465,
    secure:true,
    auth:{
        type:'OAUTH2',
        user: process.env.AUTH_EMAIL,
        clientId:'',
        clientSecret,
        password: process.env.AUTH_PASSWORD
    }
})


module.exports = transporter