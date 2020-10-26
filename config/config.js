require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000,
        sec_port: parseInt(process.env.DEV_APP_SEC_PORT) || 3443
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'book_club'
    }
};

const test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || 3000,
        sec_port: parseInt(process.env.TEST_APP_SEC_PORT) || 3443
    },
    db: {
        host: process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.TEST_DB_NAME || 'book_club_test'
    }
};

const config = {
    dev,
    test
};


module.exports = config[env];
