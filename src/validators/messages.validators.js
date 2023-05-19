const { check } = require('express-validator');
const validateResult = require('../middlewares/validate');

const validateMessage = [
    check('content', 'Content error')
        .exists()
        .withMessage('Content is required')
        .isLength({ min: 1, max: 500 })
        .withMessage('Content must be between 1 and 500 characters long')
        .isString()
        .withMessage('Content must be a string')
        .notEmpty()
        .withMessage('Content cannot be empty'),

    check('user_id', 'User error')
        .exists()
        .withMessage('User is required')
        .isInt()
        .withMessage('User must be an integer number')
        .notEmpty()
        .withMessage('User cannot be empty'),

    check('conversation_id', 'Conversation error')
        .exists()
        .withMessage('Conversation is required')
        .isInt()
        .withMessage('Conversation must be an integer number')
        .notEmpty()
        .withMessage('Conversation cannot be empty'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = validateMessage;
