const VALIDATION_EXCEPTIONS = require('./exceptions.constant');

const emailRegex = new RegExp('[a-zA-Z0-9]+@[a-zA-Z0-9].[a-z]');

const emailValidator = (input) => {
    const result = emailRegex.exec(input);

    return {
        result: result !== null,
        exception: VALIDATION_EXCEPTIONS.EMAIL
    };
};

module.exports = emailValidator;