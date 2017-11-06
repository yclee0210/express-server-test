const emailValidator = require('./email.validator');
const requiredValidator = require('./required.validator');

class Validators {
    static validate(input, validators) {
        const result = validators.reduce(
            (result, validator) => result.result ? validator(input) : result,
            {result: true}
        );

        if (result.result) {
            return input;
        } else {
            throw new Error(result.exception);
        }
    }

    static email(input) {

        return emailValidator(input);
    }

    static required(input) {

        return requiredValidator(input);
    }
}

module.exports = Validators;
