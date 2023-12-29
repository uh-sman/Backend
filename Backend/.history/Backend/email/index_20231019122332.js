const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
let config = {
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.AUTH_EMAIL,
    password: process.env.AUTH_PASSWORD,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 3599,
  },
};

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport(config);

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: subject,
      // html: `<p>${text}</p>`,
      text: `Hi ${email}`,
      html: compiledTemplate(payload),
    //   html: `<a href = "${link}">reset password</a>`,
      // text,
      expires: 300,
      // otp:`Your OTP is `
    };
    transporter.sendMail(mailOptions(), (error, info) => {
      if (error) {
        return error;
      } else {
        console.log(info.response)
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     service: "gmail",
//     port:465,
//     secure:true,
//     auth:{
//         type:"OAuth2",
//         user: process.env.AUTH_EMAIL,
//         clientId:process.env.AUTH_CLIENT_ID,
//         clientSecret:process.env.AUTH_CLIENT_SECRET,
//         password: process.env.AUTH_PASSWORD,
//         expires:3599
//     }
// })
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

// const config = {
//         host: "smtp.gmail.com",
//         service: "gmail",
//         port:587,
//         secure:false,
//         auth:{
//             // type:"OAuth2",
//             user: "user@gmail.com",
//             pass: "password",
//             // clientId:process.env.AUTH_CLIENT_ID,
//             // clientSecret:process.env.AUTH_CLIENT_SECRET,
//             // expires:3599
//         }
//     }

var transporter = nodemailer.createTransport(config);

module.exports = {
    sendEmail,
    transporter
};
