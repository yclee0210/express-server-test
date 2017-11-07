const ErrorHandler = require('./error-handler');

class CoreModule {

    constructor(logger) {

        this.logger = logger;
        this.errorHandler = new ErrorHandler(logger);
    }
}

module.exports = CoreModule;