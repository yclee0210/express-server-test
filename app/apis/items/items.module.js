module.exports = (function (express, datastore, Validators, CONFIG) {
    const RouterFactory = require('./items.router');
    const MiddlewareFactory = require('./items.middleware');
    const ModelFactory = require('./items.model');

    const model = ModelFactory(datastore, Validators, CONFIG);
    const middleware = MiddlewareFactory(model);
    const router = RouterFactory(express, middleware);

    return {
        model,
        middleware,
        router
    };
});