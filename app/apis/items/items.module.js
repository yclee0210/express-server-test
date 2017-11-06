module.exports = (function (express, datastore, Validators, logger, CONFIG) {
    const RouterFactory = require('./items.router');
    const MiddlewareFactory = require('./items.middleware');
    const ModelFactory = require('./items.model');

    const model = ModelFactory(datastore, Validators, CONFIG);
    const middleware = MiddlewareFactory(datastore, logger, model);
    const router = RouterFactory(express, middleware);

    return {
        model,
        middleware,
        router
    };
});