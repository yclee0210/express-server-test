class ErrorResponse {
    constructor(status, message, stack) {
        this.error = {
            status: status,
            message: message,
            stack: stack
        };
    }

    send(res) {

        res.status(this.error.status).message({
            message: this.error.message
        });
    }
}

class BadRequest extends ErrorResponse {
    constructor(message, stack) {

        super(400, message, stack);
    }
}

class Unauthorized extends ErrorResponse {
    constructor(message, stack) {

        super(401, message, stack);
    }
}

class PaymentRequired extends ErrorResponse {
    constructor(message, stack) {

        super(402, message, stack);
    }
}

class Forbidden extends ErrorResponse {
    constructor(message, stack) {

        super(403, message, stack);
    }
}

class NotFound extends ErrorResponse {
    constructor(message, stack) {

        super(404, message, stack);
    }
}

class Conflict extends ErrorResponse {
    constructor(message, stack) {

        super(409, message, stack);
    }
}

class ServerError extends ErrorResponse {
    constructor(message, stack) {

        super(500, message, stack);
    }
}

module.exports = {
    BadRequest,
    Unauthorized,
    PaymentRequired,
    Forbidden,
    NotFound,
    Conflict,
    ServerError
};