function runServer(ENV, datastore) {
    const express = require('express');
    const morgan = require('morgan');
    const logger = require('./logger');

    const Validators = require('./validators/validators');

    const CoreModule = require('./core/core.module');
    const ApisModule = require('./apis/apis.module');

    const core = new CoreModule(logger);
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
    app.use(core.errorHandler.middleware);

    return app.listen(ENV.PORT, () => logger.info(`Example server listening on port ${ENV.PORT}!`));
}

module.exports = runServer;