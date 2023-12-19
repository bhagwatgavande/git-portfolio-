
const cron = require("node-cron")
const User = require("../model/User.model")
const global = require('../constant/globalvar')
require('dotenv').config();

cron.schedule('* * * * *',async () => {
    let user = await User.findAll({status:0})
    console.log(user)
    const mailOptions = { 
        from: process.env.ADMINEMAIL,       // sender address
        to: user.email,          // reciever address
        subject: welcomesubject,  
        html: '<p>hi your meeting in just 15 min</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) 
          console.log(err);
        else
          console.log(info);
         });
    });