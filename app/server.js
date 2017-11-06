function runServer(ENV, datastore) {
    const express = require('express');
    const morgan = require('morgan');
    const logger = require('./logger');

    const Validators = require('./validators/validators');

    const ApisModule = require('./apis/apis.module');

    const apis = ApisModule(express, datastore, Validators, logger, ENV);

    const app = express();

    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        }, stream: logger.errorStream
    }));

    app.use(morgan('dev', {

        skip: function (req, res) {
            return res.statusCode >= 400
        }, stream: logger.stream
    }));

    app.get('/', (req, res) => res.status(200).send('Hello World'));
    app.use('/api', apis.router);

    return app.listen(ENV.PORT, () => logger.info(`Example server listening on port ${ENV.PORT}!`));
}

module.exports = runServer;