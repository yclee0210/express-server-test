const ErrorResponse = require('./error-response');

class ErrorHandler {
    static createErrorResponse(error) {
        switch (error.status) {
            case 400: {
                return new ErrorResponse.BadRequest(error.message, error.stack);
            }

            case 401: {
                return new ErrorResponse.Unauthorized(error.message, error.stack);
            }

            case 402: {
                return new ErrorResponse.PaymentRequired(error.message, error.stack);
            }

            case 403: {
                return new ErrorResponse.Forbidden(error.message, error.stack);
            }

            case 404: {
                return new ErrorResponse.NotFound(error.message, error.stack);
            }

            case 409: {
                return new ErrorResponse.Conflict(error.message, error.stack);
            }

            default: {
                return new ErrorResponse.ServerError(error.message, error.stack);
            }
        }
    }

    constructor(logger) {
        this.logger = logger;
    }

    middleware(error, req, res, next) {
        if (error.error.stack) {
            this.logger.error(error.error.stack);
        }

        error.send(res);
    }
}

module.exports = ErrorHandler;