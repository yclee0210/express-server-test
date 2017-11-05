import Datastore from '@google-cloud/datastore';

loadDb = (id) => Datastore({projectId: id});

module.exports = loadDb;