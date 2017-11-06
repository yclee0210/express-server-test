function runServer(ENV, datastore) {
    const express = require('express');
    const Validators = require('./validators/validators');

    const ApisModule = require('./apis/apis.module');

    const apis = ApisModule(express, datastore, Validators, ENV);

    const app = express();

    app.get('/', (req, res) => res.status(200).send('Hello World'));
    app.use('/api', apis.router);

    return app.listen(ENV.PORT, () => console.log(`Example server listening on port ${ENV.PORT}!`));
}

module.exports = runServer;