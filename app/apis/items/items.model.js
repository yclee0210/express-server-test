module.exports = (function (datastore, Validators, CONFIG) {
    const ErrorHandler = require('../../core/error-handler');
    const logger = require('../../logger');

    const ENTITY_KEY = CONFIG['ENTITY_KEY'] || 'MainItem_1.0.0';

    class Item {
        static get(id) {
            const key = datastore.key([ENTITY_KEY, id]);

            return datastore.get(key)
                .then((response) => new Promise((resolve, reject) => {
                    const entity = response[0];
                    if (entity) {

                        resolve(Object.assign({}, {id: entity[datastore.KEY].id}, entity));
                    } else {
                        const error = ErrorHandler.createErrorResponse({
                            status: 404,
                            message: 'No Items Available'
                        });
                        reject(error);
                    }
                }))
                .catch((error) => new Promise((resolve, reject) =>
                    reject(ErrorHandler.createErrorResponse(error.error))));
        };

        static list() {
            const query = datastore.createQuery(ENTITY_KEY);

            return datastore.runQuery(query)
                .then((response) => new Promise((resolve, reject) => {

                    if (response[0].length > 0) {
                        const list = response[0].map(
                            (entity) => Object.assign({}, {id: entity[datastore.KEY].id}, entity)
                        );

                        resolve(list);
                    } else {
                        const error = ErrorHandler.createErrorResponse({
                            status: 404,
                            message: 'No Items Available'
                        });
                        reject(error);
                    }
                }))
                .catch((error) => new Promise((resolve, reject) =>
                    reject(ErrorHandler.createErrorResponse(error.error))));
        };

        constructor(entity) {
            this.title = Validators.validate(entity.title, [
                Validators.required,
            ]);
        }

        save() {
            const key = datastore.key([ENTITY_KEY]);
            const timestamp = new Date().toJSON();

            const data = {
                id: key.id,
                title: this.title,
                created: timestamp,
                updated: timestamp
            };

            return datastore.save({
                key: key,
                data: data
            })
                .then(() => new Promise((resolve) => resolve()))
                .catch((error) => new Promise((resolve, reject) =>
                    reject(ErrorHandler.createErrorResponse(error.error))));
        }
    }

    return Item;
});