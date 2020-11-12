const { PDFDocument, StandardFonts, rgb }       = require('pdf-lib');
const fs                                        = require('fs');

const writeQuoteDoc = async (req, res, next) => {
    let quote = req.body.payload;
    const doc = await PDFDocument.create();
    const page = doc.addPage();

    const check_blank = (value) => {
    }

    /**
     * Text constants
     * 
     **/
    var txtVals = {
      'salesperson': `${quote.salesperson.fname} ${quote.salesperson.lname}`,
      'salesPersonPhone': `${quote.salesperson.phone}`,
      'name': `${quote.customer.fname} ${quote.customer.lname}`,
      'phone': quote.customer.phone,
      'email': quote.customer.email,
      'address': quote.customer.address,
      'boatType': quote.boat_model,
      'boatName': quote.boat_name,
      'sailReq': quote.sail_request,
      'battens': quote.battens,
      'reefPt': quote.reefing_pts,
      'numLogo': quote.num_logo,
      'furling': quote.furl_sys,
      'uvColor': quote.uv_color,
      'homePort': quote.home_port,
      'pickUp': quote.delivery_type,
      'sailType': quote.sailing_type,
      'notes': quote.notes
    }

    Object.keys(txtVals).map((key, index) => {
        txtVals[key] = (txtVals[key] === undefined) ? '' : txtVals[key];
    });

    const hdrText = 'UKNY New Customer Info';
    const salespersonText = `${txtVals["salesperson"]}`;
    const localeText = '10 Midland Ave - M-04, Portchester NY, 10573';
    const salesPersonPhoneText = `${txtVals["salesPersonPhone"]}`;
    const workEmailText = 'dave@uksailmakers-ny.com';
    const officePhoneText ='914.600.8800';
    const webSiteText = 'www.uksailmakers-ny.com';
    const subHdrText = 'NEW CLIENT SAIL QUOTE REQUEST';
    const nameText = `Name: ${txtVals["name"]}`;
    const phoneText = `Phone#: ${txtVals["phone"]}`;
    const emailText = `Email: ${txtVals["email"]}`;
    const addressText = `Address: ${txtVals["address"]}`;
    const boatTypeText =`Boat Type: ${txtVals["boatType"]}`;
    const boatNameText = `Boat Name: ${txtVals["boatName"]}`;
    const sailReqText = `Sail Requested: ${txtVals["sailReq"]}`;
    const battensText =  `Battens - ${txtVals["battens"]}`;
    const reefPtText = `Reefing Points - ${txtVals["reefPt"]}`;
    const numLogoText = `Numbers/Logos - ${txtVals["numLogo"]}`;
    const furlingText = `Furling System - ${txtVals["furling"]}`;
    const uvColorText = `UV Color: ${txtVals["uvColor"]}`;
    const homePortText = `Home Port: ${txtVals["homePort"]}`;
    const pickUpText = `Sail pick up/Drop off: ${txtVals["pickUp"]}`;
    const sailTypeText = `Type of Sailing - ${txtVals["sailType"]}`;
    const notesText =  `Additional Notes - ${txtVals["notes"]}`;

    const {width, height} = page.getSize();

    const boldObliqueFont = await doc.embedFont(StandardFonts.HelveticaBoldOblique);
    const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

    page.drawRectangle({x: 29.764, y: 801.89, width: width * .9, height: 30, color: rgb(0, 0.55, 0.81)});
    page.drawText(hdrText, {x: 178.584, y: 811.89, size: 20, color: rgb(0.99, 0.99, 0.99)});
    
    let logo_img = fs.readFileSync('public/images/sailmakers_logo.png');
    const  img = await doc.embedPng(logo_img);
    const imgDims = img.scale(0.60);
    page.drawImage(img, {x: 59.528, y: 719.13, width: imgDims.width, height: imgDims.height});

    const body = [
        {'text': salespersonText, 'options': {x: 175.128, y: 786.39, size: 15, font: boldFont, color: rgb(0, 0, 0)}},
        {'text': localeText, 'options': {x: 175.128, y: 774.89, size: 10, color: rgb(0, 0, 0)}},
        {'text': salesPersonPhoneText, 'options': {x: 175.128, y: 764.89, size: 10, color: rgb(0, 0, 0)}},
        {'text': workEmailText, 'options' : {x: 175.128, y: 754.89, size: 10, color: rgb(0, 0, 0)}},
        {'text': officePhoneText, 'options': { x: 175.128, y: 744.89, size: 10, color: rgb(0, 0, 0)}},
        {'text': webSiteText, 'options': {x: 175.128, y: 734.89, size: 10, color: rgb(0, 0, 0)}},
        {'text': subHdrText, 'options': {x: 29.764, y: 650, size: 13, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': nameText, 'options': {x: 29.764, y: 615, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': phoneText, 'options': {x: 29.764, y: 580, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': emailText, 'options': {x: 29.764, y: 545, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': addressText, 'options': {x: 29.764, y: 510, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': boatTypeText, 'options': {x: 29.764, y: 475, size: 12, color: rgb(0, 0, 0)}},
        {'text': boatNameText, 'options': {x: 29.764, y: 440, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': sailReqText, 'options': {x: 29.764, y: 405, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': battensText, 'options': {x: 29.764, y: 370, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': reefPtText, 'options': {x: 29.764, y: 335, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': numLogoText, 'options': {x: 29.764, y: 300, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': furlingText, 'options': {x: 29.764, y: 265, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': uvColorText, 'options': {x: 29.764, y: 230, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': homePortText, 'options': {x: 29.764, y: 195, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': pickUpText, 'options': {x: 29.764, y: 160, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': sailTypeText, 'options': {x: 29.764, y: 125, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}},
        {'text': notesText, 'options': {x: 29.764, y: 90, size: 12, font: boldObliqueFont, color: rgb(0, 0, 0)}}
    ];

    for (var content in body) {
        page.drawText(body[content]['text'], body[content]['options']);
    }

    var lines = [
        { start: {x: 29.764, y: 649}, end: {x: 260, y: 649} },
        { start: {x: 29.764, y: 614}, end: {x: 65, y: 614} },
        { start: {x: 29.764, y: 579}, end: {x: 75, y: 579} },
        { start: {x: 29.764, y: 544}, end: {x: 65, y: 544} },
        { start: {x: 29.764, y: 509}, end: {x: 80, y: 509} },
        { start: {x: 29.764, y: 474}, end: {x: 90, y: 474} },
        { start: {x: 29.764, y: 439}, end: {x: 95, y: 439} },
        { start: {x: 29.764, y: 404}, end: {x: 115, y: 404} },
        { start: {x: 29.764, y: 369}, end: {x: 75, y: 369} },
        { start: {x: 29.764, y: 334}, end: {x: 120, y: 334} },
        { start: {x: 29.764, y: 299}, end: {x: 120, y: 299} },
        { start: {x: 29.764, y: 264}, end: {x: 120, y: 264} },
        { start: {x: 29.764, y: 229}, end: {x: 85, y: 229} },
        { start: {x: 29.764, y: 194}, end: {x: 95, y: 194} },
        { start: {x: 29.764, y: 159}, end: {x: 145, y: 159} },
        { start: {x: 29.764, y: 124}, end: {x: 115, y: 124} },
        { start: {x: 29.764, y: 89}, end: {x: 125, y: 89} }
    ];


    for (var idx= 0; idx < lines.length; idx++) {
        page.drawLine(lines[idx], {color: rgb(0, 0, 0)});
    }

    var filename = `./public/files/quote_${quote._id}.pdf`;
    fs.writeFileSync(filename, await doc.save());
    req.attachment = filename;

    next();
}

module.exports = {
    writeQuoteDoc
}
