const config        = require('../config/config');
const nodemail      = require('nodemailer');
const sendmail      = require('sendmail')();
const smtpTransport = require('nodemailer-smtp-transport');

const deliverQuote = (req, res, next) => {
    var file_attachment = req.attachment;
    var transporter = nodemail.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: config.mail.office,
            pass: config.mail.access
        }
    }));

    var mailOptions = {
        from: 'android@reigndesign.com;',
        to: 'teserac_4@hotmail.com, dave@uksailmakers-ny.com, dave@secondrowproductions.com',
        subject: ' This is a test',
        html: '<h1> Test </h1><p>This is a test of sending a quote attachment by email</p>',
        attachments: [{path: file_attachment}]
    };

    transporter.sendMail(mailOptions, function (error, info) {
           if (error){
               console.log('Error: ' + error);
               next(error);
           }

           console.log(`Message ${info.messageId} sent: ${info.response}`);
           req.infoMessage = info.messageId
           next();
    })
}

const deliverEmail = (req, res, next) => {
    var data = req.body
    var transporter = nodemail.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: config.mail.office,
            pass: config.mail.access
        }
    }));

    var recipients = data.recipients.join(', ');
    var mailOptions = {
        from: 'android@reigndesign.com;',
        to: recipients,
        subject: data.subject,
        html: data.body,
    };

    transporter.sendMail(mailOptions, function (error, info) {
           if (error){
               console.log('Error: ' + error);
               next(error);
           }

           console.log(`Message ${info.messageId} sent: ${info.response}`);
           req.infoMessage = info.messageId
           next();
    })
}

module.exports = {
    deliverQuote,
    deliverEmail
}
