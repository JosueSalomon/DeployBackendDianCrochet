"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "josueisacsalomonlanda@gmail.com",
        pass: "fgye tbea spdr sjlb",
    },
});
exports.transporter.verify().then(() => {
    console.log('Ready for send emails');
});
