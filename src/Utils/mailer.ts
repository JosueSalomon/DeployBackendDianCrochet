const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "josueisacsalomonlanda@gmail.com",
    pass: "fgye tbea spdr sjlb",
  },
});

transporter.verify().then(()=>{
    console.log('Ready for send emails')
})
