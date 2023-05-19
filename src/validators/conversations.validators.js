const { check } = require('express-validator');
const validateResult = require('../middlewares/validate');

const validateConversation = [
    check('title', 'Title error')
        .exists()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 50 })
        .withMessage('Title must be between 5 and 50 characters long')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Title cannot be empty'),

    check('type_id', 'Type error')
        .exists()
        .withMessage('Type is required')
        .isInt()
        .withMessage('Type must be an integer number')
        .notEmpty()
        .withMessage('Type cannot be empty'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = validateConversation;



