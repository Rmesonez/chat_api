const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        next({
            status: 400,
            name: 'Validation Error',
            message: error.errors.map( err => err.msg)
        });
    }
}

module.exports = validateResult;