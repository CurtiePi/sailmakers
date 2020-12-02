const express           = require('express');
const routeController   = require('../controllers/routingController');
const multer            = require('multer');
const mailman           = require('../middleware/mailman.js');
const printpress        = require('../middleware/guttenburg.js');
const lycanthrope       = require('../middleware/modifier.js');
const apiQuoteRouter    = express.Router();

const upload = multer({
    dest: './public/files/uploads',
});

module.exports  = apiQuoteRouter;

/*
 * Quote routes
 */

/**
 * @api {get} /list quotes 
 *
 */
apiQuoteRouter.get('/', routeController.getQuoteList);
apiQuoteRouter.get('/:id', routeController.getQuoteById);
apiQuoteRouter.get('/customer/:cid', routeController.getQuotesByCustomer);

apiQuoteRouter.post('/create', routeController.createQuote);
apiQuoteRouter.post('/update', routeController.updateQuote);
/*
apiQuoteRouter.post('/email', mailman.deliverQuote, (req, res, next) => {
    res.status(200).json({message: 'mail sent'});
});
*/
apiQuoteRouter.post('/email', mailman.deliverQuote, (req, res, next) => {
    res.status(200).json({message: 'Quote has been sent.'});
});
apiQuoteRouter.post('/print', printpress.writeQuoteDoc, (req, res, next) => {
    var file = req.attachment;
    res.status(200).json({message: 'Quote has been created.', attachment: file});
});
apiQuoteRouter.post('/modify', lycanthrope.modifyQuote, (req, res, next) => {
    var totalPrice = req.totalprice;
    res.status(200).json({message: 'Quote has been modified.', quote_price: totalPrice});
});
apiQuoteRouter.post('/price', upload.single('file'),  lycanthrope.modifyQuote, (req, res, next) => {
    var totalPrice = req.totalprice;
    res.status(200).json({message: 'File has been uploaded.', quote_price: totalPrice});
});
