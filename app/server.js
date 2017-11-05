function runServer(ENV) {
    const express = require('express');

    const app = express();

    app.get('/', (req, res) => res.status(200).send('Hello World'));

    return app.listen(ENV.PORT, () => console.log(`Example server listening on port ${ENV.PORT}!`));
}

module.exports = runServer;