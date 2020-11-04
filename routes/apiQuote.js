const express           = require('express');
const routeController   = require('../controllers/routingController');
const mailman           = require('../middleware/mailman.js');
const printpress        = require('../middleware/guttenburg.js');
const apiQuoteRouter    = express.Router();

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
/*
apiQuoteRouter.post('/email', mailman.deliverQuote, (req, res, next) => {
    res.status(200).json({message: 'mail sent'});
});
*/
apiQuoteRouter.post('/email', printpress.writeQuoteDoc, mailman.deliverQuote, (req, res, next) => {
    res.status(200).json({message: 'Quote has been sent.'});
});
