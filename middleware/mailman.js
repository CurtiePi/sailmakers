const config        = require('../config/config');
const nodemail      = require('nodemailer');
const sendmail      = require('sendmail')();
const smtpTransport = require('nodemailer-smtp-transport');
const signature     = require('../config/signature');

const deliverQuote = (req, res, next) => {
    var data = req.body
    var filepath = './public/files/pdf/';
    var file_attachment = data.attachment;
    /*
    var transporter = nodemail.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: config.mail.office,
            pass: config.mail.access
        }
    }));
    */

    var transporter = nodemail.createTransport(smtpTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: config.mail.office,
            pass: config.mail.access
        },
        tls: {
            ciphers: 'SSLv3'
        }
    }));

    var recipients = data.recipients.join(', ');
    var messageBody = `<p>Please find attached a new cutomer request</p><p>${signature}</p>`;
    var mailOptions = {
        from: 'dave@uksailmakers-ne.com;',
        to: recipients,
        subject: 'Customer Request',
        html: 'Please find attached a new customer request</p>',
        attachments: [{
            filename: 'sailmakers_logo.png',
            path: './public/images/sailmakers_logo.jpg',
            cid: 'dave@uk-sailmakers-ne.com'
        }, {path: file_attachment}]
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
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: config.mail.office,
            pass: config.mail.access
        },
        tls: {
            ciphers: 'SSLv3'
        }
    }));


    var messageBody = `${data.body}<p>${signature}</p>`;
    var recipients = data.recipients.join(', ');
    var mailOptions = {
        from: 'dave@uksailmakers-ne.com;',
        to: recipients,
        subject: data.subject,
        html: messageBody,
        attachments: [{
            filename: 'sailmakers_logo.jpg',
            path: './public/images/sailmakers_logo.jpg',
            cid: 'dave@uk-sailmakers-ne.com'
        }]
    };

    if (data.attachment) {
        var filepath = `./public/files/pdf/${data.attachment}`;
        mailOptions['attachments'].push({path: filepath});
    }

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
