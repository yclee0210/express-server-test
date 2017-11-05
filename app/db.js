const Datastore = require('@google-cloud/datastore');

loadDb = (id) => {
    const datastore = Datastore({projectId: id});

    let query = datastore.createQuery('MainItem');
    datastore.runQuery(query)
        .then(() => console.log(`Connected to Datastore at ${new Date().toJSON()}`))
        .catch((error) => {
            console.log('Datastore Connection Failed: ' + error);
            process.exit(1);
        });
};

module.exports = loadDb;