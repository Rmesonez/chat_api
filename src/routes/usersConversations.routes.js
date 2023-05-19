const { Router } = require('express');
const router = Router();
const {
    getAllUsersConversations,
    createUserConversation,
    updateUserConversation,
    deleteUserConversation,
    getOneUserConversation
} = require('../controllers/usersConversations.controller');
const usersConversationsValidator = require('../validators/usersConversations.validators');

router.get('/users_conversations', getAllUsersConversations);

router.get('/users_conversations/:id', getOneUserConversation);

router.post('/users_conversations', usersConversationsValidator, createUserConversation);

router.put('/users_conversations/:id', usersConversationsValidator, updateUserConversation);

router.delete('/users_conversations/:id', deleteUserConversation);

module.exports = router;