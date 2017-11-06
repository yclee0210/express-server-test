module.exports = (function (datastore, Validators, CONFIG) {
    const ENTITY_KEY = CONFIG['ENTITY_KEY'] || 'MainItem_1.0.0';

    class Item {
        static get(id) {
            const key = datastore.key([ENTITY_KEY, id]);

            return datastore.get(key)
                .then((response) => new Promise((resolve, reject) => {
                    if (response.length > 0) {
                        const entity = response[0];
                        resolve(Object.assign({}, {id: entity[datastore.KEY]}, entity));
                    } else {
                        reject({
                            error: {
                                status: 404,
                                message: 'No Items Available',
                                code: 'NOT_FOUND'
                            }
                        });
                    }
                }));
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

                        reject({
                            error: {
                                status: 404,
                                message: 'No Items Available',
                                code: 'NOT_FOUND'
                            }
                        });
                    }
                }));
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
            });
        }
    }

    return Item;
});