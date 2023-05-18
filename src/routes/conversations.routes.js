const { Router } = require('express');
const router = Router();
const {
    getAllConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getOneConversation
} = require('../controllers/conversations.controller');
const auth = require('../middlewares/auth.middleware');

//get all conversations
router.get('/api/conversations', getAllConversations);

//create a new conversation
router.post('/api/conversations', auth, createConversation);

//get a conversation by id
router.get('/api/conversations/:id', getOneConversation);

//update a conversation by id
router.put('/api/conversations/:id', updateConversation);

//delete a conversation by id
router.delete('/api/conversations/:id', deleteConversation);

module.exports = router;
