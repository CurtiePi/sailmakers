const express               = require('express');
const routeController       = require('../controllers/routingController');
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

