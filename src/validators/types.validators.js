const { check } = require('express-validator');
const validateResult = require('../middlewares/validate');

const validateTypes = [
    check('type', 'Type error')
        .exists()
        .withMessage('Type is required')
        .isLength({ min: 5, max: 50 })
        .withMessage('Type must be between 5 and 50 characters long')
        .isString()
        .withMessage('Type must be a string')
        .notEmpty()
        .withMessage('Type cannot be empty'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = validateTypes;