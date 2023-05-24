const { Router } = require('express');
const router = Router();
const {
    getAllConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getOneConversation,
    getAllConversationsInfo
} = require('../controllers/conversations.controller');
const auth = require('../middlewares/auth.middleware');
const validateConversation = require('../validators/conversations.validators');

//get all conversations
router.get('/api/conversations', getAllConversations);

//get all conversations info
router.get('/api/conversations/info', getAllConversationsInfo);

//create a new conversation
router.post('/api/conversations', auth, validateConversation, createConversation);

//get a conversation by id
router.get('/api/conversations/:id', getOneConversation);

//update a conversation by id
router.put('/api/conversations/:id', updateConversation);

//delete a conversation by id
router.delete('/api/conversations/:id', deleteConversation);

module.exports = router;
