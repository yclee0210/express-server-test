const VALIDATION_EXCEPTIONS = require('./exceptions.constant');

const requiredValidator = (input) => {

    return {
        result: typeof input === 'boolean' || typeof input === 'number' ? true : !!input,
        exception: VALIDATION_EXCEPTIONS.REQUIRED
    };
};

module.exports = requiredValidator;