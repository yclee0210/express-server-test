module.exports = (function (express, datastore, Validators, CONFIG) {
    const ItemsModule = require('./items/items.module');
    const RouterFactory = require('./apis.router');

    const items = ItemsModule(express, datastore, Validators, CONFIG);

    const router = RouterFactory(express, items);

    return {
        router
    };
});