const ENV = require('./env/environment');
const loadDb = require('./app/db');
const runServer = require('./app/server');

const datastore = loadDb(ENV.DATASTORE_ID);

runServer(ENV, datastore);