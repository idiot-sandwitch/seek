const nodemailer = require('nodemailer');
const winston = require('winston');

let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    },
});

module.exports.transporter = transporter;

module.exports.sendMail = async ({ from, to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({ from, to, subject, text, html });
        let receivers = "";
        info.envelope.to.forEach(rec => { receivers += rec + "  " });
        winston.info(`Message sent to ${receivers}`);
    } catch (err) {
        winston.error(err.message, err);
    }
}