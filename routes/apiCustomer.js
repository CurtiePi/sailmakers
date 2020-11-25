const express               = require('express');
const routeController       = require('../controllers/routingController');
const mailman               = require('../middleware/mailman.js');
const apiCustomerRouter     = express.Router();

module.exports  = apiCustomerRouter;

/*
 * Customer routes
 */

/**
 * @api {get} /list customers
 *
 */
apiCustomerRouter.get('/', routeController.getCustomerList);
apiCustomerRouter.get('/:id', routeController.getCustomerById);

apiCustomerRouter.post('/update', routeController.updateCustomer);
apiCustomerRouter.post('/create', routeController.createCustomer);
apiCustomerRouter.post('/email', mailman.deliverEmail, (req, res, next) => {
  res.status(200).json({'message': req.message});
});

