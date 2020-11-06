const dataAccess        = require('./dataAccessController');

module.exports = {
    /*
     * Customers
     *
     */
    getCustomerList: async (req, res, next) => {
        try {
            var customers = await dataAccess.listCustomers();
            res.status(200).json(customers);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving customer list ${err}` 
            })
        }
    },
    getCustomerById: async (req, res, next) => {
        try {
            var customer = await dataAccess.getCustomerById(req.params.id);
            res.status(200).json(customer);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving customer ${err}` 
            });
        }
    },
    createCustomer: async (req, res, next) => {
        try{
            var customer = await dataAccess.createCustomer(req.body);
            res.status(200).json(customer);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error creating customer ${err}`
            });
        }
    },
    updateCustomer: async (req, res, next) => {
        try {
            var customer = await dataAccess.updateCustomer(req.body.criteria, req.body.update);
            res.status(200).json(customer);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error updating customer ${err}` 
            });
        }
    },
    /*
     * Quotes
     *
     */
    getQuoteList: async (req, res, next) => {
        console.log("Getting list of quotes");
        try {
            var quotes = await dataAccess.listQuotes();
            res.status(200).json(quotes);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving quotes list ${err}` 
            });
        }
    },
    getQuoteById: async (req, res, next) => {
        try {
            var quote = await dataAccess.getQuoteById(req.params.id);
            res.status(200).json(quote);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving quote ${err}` 
            });
        }
    },
    getQuotesByCustomer: async (req, res, next) => {
        try{
            var quotes = await dataAccess.getCustomerQuotes(req.params.cid);
            res.status(200).json(quotes);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving quote ${err}`
            });
        }
    },
    createQuote: async (req, res, next) => {
        try{
            var quote = await dataAccess.createQuote(req.body);
            res.status(200).json(quote);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error creating quote ${err}`
            });
        }
    },
    /*
     * Salespeople
     *
     */
    getSalespeople: async (req, res, next) => {
        try {
            var salespeople = await dataAccess.getSalespeople();
            res.status(200).json(salespeople);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving salespeople list  ${err}` 
            });
        }
    },
    getSalespersonById: async (req, res, next) => {
        try {
            var salesperson = await dataAccess.getSalespersonById(req.params.sid);
            res.status(200).json(salesperson);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving salesperson  ${err}` 
            });
        }
    },
    createSalesperson: async (req, res, next) => {
        try {
            var salesperson = await dataAccess.createSalesperson(req.body);
            res.status(200).json(salesperson);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error creating salesperson  ${err}` 
            });
        }
    },
    getSalespersonByName: async (req, res, next) => {
        try {
            var salesperson = await dataAccess.getSalespersonByName(req.params.name);
            res.status(200).json(salesperson);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving salesperson ${err}` 
            });
        }
    },
    /*
     * Ports
     *
     */
    getPortsList: async (req, res, next) => {
        try {
            var ports = await dataAccess.listPorts();
            res.status(200).json(ports);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving ports list ${err}` 
            })
        }
    },
    getPortById: async (req, res, next) => {
        try {
            var port = await dataAccess.getPortById(req.params.pid);
            res.status(200).json(port);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error retrieving port ${err}` 
            });
        }
    },
    createPort: async (req, res, next) => {
        try {
            console.log(req.body);
            var port = await dataAccess.createPort(req.body);
            res.status(200).json(port);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error creating port  ${err}` 
            });
        }
    },
    updatePort: async (req, res, next) => {
        try {
            var port = await dataAccess.updatePort(req.body.criteria, req.body.update);
            res.status(200).json(port);
        }
        catch(err) {
            return res.status(500).json({
                message: `Error updating port ${err}` 
            });
        }
    },

}
