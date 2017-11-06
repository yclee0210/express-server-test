const emailValidator = require('./email.validator');
const requiredValidator = require('./required.validator');

class Validators {
    static validate(input, validators) {
        const result = validators.reduce(
            (result, validator) => result.result ? validator(input) : result,
            {result: true}
        );

        return result.result ? input : new Error(result.exception);
    }

    static email(input) {

        return emailValidator(input);
    }

    static required(input) {

        return requiredValidator(input);
    }
}

module.exports = Validators;
