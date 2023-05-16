const Conversations = require('../models/conversations.model');
const Users = require('../models/users.model');
const Messages = require('../models/messages.model');
const Types = require('../models/types.model');

const getAllConversations = async (req, res) => {
    try {
        const getConversations = await Conversations.findAll({
            attributes: ['id', 'title'],
            include: [{
                model: Types,
                attributes: ['type']
            },{
                model: Users,
                attributes: ['firstname', 'lastname', 'username', 'email'],
                include: [{
                    model: Messages,
                    attributes: ['content']
                }]
            }
        ]
        });
        res.status(200).json(getConversations);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the Conversations',
        });
    }
}

const createConversation = async (req, res) => {
    const { title, type_id, user_id } = req.body;
    try {
        const newConversation = await Conversations.create({ title, type_id, user_id });
        res.status(201).json(newConversation);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot create a Conversation',
        });
    }
}

const updateConversation = async (req, res) => {
    const { title, type_id } = req.body;
    try {
        const updateConversation = await Conversations.update(
            { title, type_id },
            { where: { id: req.params.id }
        });
        res.status(202).json(updateConversation);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot update a Conversation',
        });
    }
}

const deleteConversation = async (req, res) => {
    try {
        await Conversations.destroy({ where: { id: req.params.id } });
        res.status(204).json({
            message: 'Conversation deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot delete a Conversation',
        });
    }
}

const getOneConversation = async (req, res) => {
    try{
        const getConversation = await Conversations.findOne(
            { where: { id: req.params.id },
            attributes: ['id', 'title'],
            include: [{
                model: Types,
                attributes: ['type']
            },{
                model: Users,
                attributes: ['firstname', 'lastname', 'username', 'email'],
                include: [{
                    model: Messages,
                    attributes: ['content']
                }]
            }
        ]
        });
        res.status(200).json(getConversation);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the Conversation',
        });
    }
}

module.exports = {
    getAllConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getOneConversation
}


