const { check } = require('express-validator');
const validateResult = require('../middlewares/validate');

const validateUsersConversations = [
    check('user_id', 'User id error')
        .exists()
        .withMessage('User id is required')
        .isInt()
        .withMessage('User id must be an integer')
        .notEmpty()
        .withMessage('User id cannot be empty'),

    check('conversation_id', 'Conversation id error')
        .exists()
        .withMessage('Conversation id is required')
        .isInt()
        .withMessage('Conversation id must be an integer')
        .notEmpty()
        .withMessage('Conversation id cannot be empty'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = validateUsersConversations;