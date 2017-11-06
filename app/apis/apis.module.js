module.exports = (function (express, datastore, Validators, logger, CONFIG) {
    const ItemsModule = require('./items/items.module');
    const RouterFactory = require('./apis.router');

    const items = ItemsModule(express, datastore, Validators, logger, CONFIG);

    const router = RouterFactory(express, items);

    return {
        router
    };
});