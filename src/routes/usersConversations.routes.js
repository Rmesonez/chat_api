const { Router } = require('express');
const router = Router();

const {
    getAllUsersConversations,
    createUserConversation,
    updateUserConversation,
    deleteUserConversation,
    getOneUserConversation
} = require('../controllers/usersConversations.controller');

router.get('/users_conversations', getAllUsersConversations);

router.get('/users_conversations/:id', getOneUserConversation);

router.post('/users_conversations', createUserConversation);

router.put('/users_conversations/:id', updateUserConversation);

router.delete('/users_conversations/:id', deleteUserConversation);

module.exports = router;