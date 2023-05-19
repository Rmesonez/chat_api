const { Router } = require('express');
const router = Router();
const {
    getAllMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    getOneMessage,
    getAllMessagesInfo
} = require('../controllers/messages.controller');

//get all messages
router.get('/api/messages', getAllMessages);

//get all messages info
router.get('/api/messages/info', getAllMessagesInfo);

//create a new message
router.post('/api/messages', createMessage);

//get a message by id
router.get('/api/messages/:id', getOneMessage);

//update a message by id
router.put('/api/messages/:id', updateMessage);

//delete a message by id
router.delete('/api/messages/:id', deleteMessage);

module.exports = router;
