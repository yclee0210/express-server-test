module.exports = (function (datastore, Validators, CONFIG) {
    const ENTITY_KEY = CONFIG['ENTITY_KEY'] || 'MainItem_1.0.0';

    class Item {
        static get(id) {
            const key = datastore.key([ENTITY_KEY, id]);

            return datastore.get(key);
        };

        static list() {
            const query = datastore.createQuery(ENTITY_KEY);

            return datastore.runQuery(query);
        };

        constructor(entity) {
            console.log(entity);
            this.title = Validators.validate(entity.title, [
                Validators.required,
            ]);
        }

        save() {
            const key = datastore.key([ENTITY_KEY]);
            const timestamp = new Date().toJSON();

            const data = {
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