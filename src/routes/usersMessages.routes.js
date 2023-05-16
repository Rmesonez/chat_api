const { Router } = require('express');
const router = Router();

const {
    getAllUsersMessages,
    createUserMessage,
    updateUserMessage,
    deleteUserMessage,
    getOneUserMessage
} = require('../controllers/usersMessages.controller');

router.get('/users_messages', getAllUsersMessages);

router.get('/users_messages/:id', getOneUserMessage);

router.post('/users_messages', createUserMessage);

router.put('/users_messages/:id', updateUserMessage);

router.delete('/users_messages/:id', deleteUserMessage);

module.exports = router;