const config        = require('../config/config');
const nodemail      = require('nodemailer');
const sendmail      = require('sendmail')();
const smtpTransport = require('nodemailer-smtp-transport');

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
    var mailOptions = {
        from: 'dave@uksailmakers-ne.com;',
        to: recipients,
        subject: 'Customer Request',
        html: 'Please find attached a new customer request</p>',
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
    var mailOptions = {
        from: 'dave@uksailmakers-ne.com;',
        to: recipients,
        subject: data.subject,
        html: data.body,
    };

    if (data.attachment) {
        var filepath = `./public/files/pdf/${data.attachment}`;
        mailOptions['attachments'] = [{path: filepath}];
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
