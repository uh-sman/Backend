const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     service: "gmail",
//     port:465,
//     secure:true,
//     auth:{
//         type:'OAUTH2',
//         user: process.env.AUTH_EMAIL,
//         clientId:process.env.AUTH_CLIENT_ID,
//         clientSecret:process.env.AUTH_CLIENT_SECRET,
//         password: process.env.AUTH_PASSWORD,
//         expires:3599
//     }
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port:465,
    secure:true,
    auth:{
        type:'OAUTH2',
        user: process.env.AUTH_EMAIL,
        clientId:process.env.AUTH_CLIENT_ID,
        clientSecret:process.env.AUTH_CLIENT_SECRET,
        password: process.env.AUTH_PASSWORD,
        expires:3599
    }
})
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     service:'gmail',
//     port: 465,
//     secure: true,
//     auth: {
//       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASSWORD,
//     }
//   });


module.exports = transporter