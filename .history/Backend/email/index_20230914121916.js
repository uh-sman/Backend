const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp-mail.gmail.com",
    auth:{
        email,
        password
    }
})