const nodemailer = require("nodemailer")
require('dotenv').config();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: process.env.MAILERUSER,   
            pass: process.env.MAILERUSERPASS           
          }
 });

module.exports = {
    transporter
}