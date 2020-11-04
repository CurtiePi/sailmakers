/*
 * Set up the dependencies to power this app
 */

const express           = require('express');
const fs                = require('fs');
const path              = require('path');
const http              = require('http');
const https             = require('https');
const cors              = require('cors');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const mongoose          = require('mongoose');
const config            = require('./config/config');
const passport          = require('passport');
//require('./lib/strategies')(passport)

/*
 * TODO DECIDE ON DATABASE, MONGO OR MYSQL
 * Set up the database connection
 */ 

let db_host = config.db.host;
let db_port = config.db.port;
let db_name = config.db.name;

let conn_str = `mongodb://${db_host}:${db_port}/${db_name}`;

/*
 * Connection Options Explained
 * useNewUrlParser: allow users to fall back to the old parser if they find a bug in the new parser
 * useUnifiedTopology: server discover and monitor engine
 * useCreateIndex: help Mongoose's default index build avoid deprecation warnings
 * keepAlive: to avoid connection closed errors
 */

mongoose.connect(conn_str, {useNewUrlParser: true,
                               useUnifiedTopology: true,
                               useCreateIndex: true,
                               useFindAndModify: false,
                               keepAlive: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

console.log(`Database: ${conn_str}`)


var privateKey = fs.readFileSync('./config/dev.sailmakers.com.key', 'utf8');
var certificate = fs.readFileSync('./config/dev.sailmakers.com.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var smapp = express();
smapp.use(cors({credentials: true, origin: 'http://192.168.1.6:8080'}));
smapp.use(cookieParser());

smapp.use(bodyParser.json());
smapp.use(bodyParser.urlencoded({ extended: true }));
smapp.use(passport.initialize());
smapp.use('images', express.static(path.join(__dirname, 'public/images')));
smapp.disable('x-powered-by');
/*
 * Set up routing here
 */
customerRouter = require('./routes/apiCustomer');
salespersonRouter = require('./routes/apiSalesForce');
quoteRouter = require('./routes/apiQuote');
portRouter = require('./routes/apiPort');

smapp.use('/api/customer', customerRouter);
smapp.use('/api/staff', salespersonRouter);
smapp.use('/api/quote', quoteRouter);
smapp.use('/api/port', portRouter);

smapp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var httpServer = http.createServer(smapp);
var httpsServer = https.createServer(credentials, smapp);

/*
 * Assign port to the app
 */
let app_port = config.app.port;
let sec_app_port = config.app.sec_port;
httpServer.listen(app_port);
httpsServer.listen(sec_app_port);
console.log(`HTTP server is  listeing on port ${app_port}`)
console.log(`HTTPS server is  listeing on port ${sec_app_port}`)


module.exports = smapp;
