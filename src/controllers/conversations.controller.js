const Conversations = require('../models/conversations.model');
const Users = require('../models/users.model');
const Messages = require('../models/messages.model');
const Types = require('../models/types.model');

const getAllConversations = async (req, res, next) => {
    try {
        const getConversations = await Conversations.findAll({
            attributes: ['id', 'title'],
        });
        res.status(200).json(getConversations);
    } catch (error) {
        next(error);
    }
}

const createConversation = async (req, res, next) => {
    const { title, type_id, user_id } = req.body;
    try {
        const newConversation = await Conversations.create({ title, type_id, user_id });
        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

const updateConversation = async (req, res, next) => {
    const { title, type_id } = req.body;
    try {
        const updateConversation = await Conversations.update(
            { title, type_id },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        next(error);
    }
}

const deleteConversation = async (req, res, next) => {
    try {
        await Conversations.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const getOneConversation = async (req, res, next) => {
    try{
        const getConversation = await Conversations.findOne(
            { where: { id: req.params.id },
            attributes: ['id', 'title'],
            include: [{
                model: Types,
                attributes: ['type']
            },{
                    model: Messages,
                    attributes: ['content'],
                    include: [{
                        model: Users,
                        attributes: [ 'username']
                }]
            }
        ]
        });
        res.status(200).json(getConversation);
    } catch (error) {
        next(error);
    }
}

const getAllConversationsInfo = async (req, res, next) => {
    try {
        const getConversations = await Conversations.findAll({
            attributes: ['id', 'title'],
            include: [{
                model: Types,
                attributes: ['type']
            },{
                    model: Messages,
                    attributes: ['content'],
                    include: [{
                        model: Users,
                        as: 'createdBy',
                        attributes: [ 'username']
                }]
            }
        ]
        });
        res.status(200).json(getConversations);
    } catch (error) {
        next(error);
    }
}

//create a conversation by type
// const createConversationByType = async (req, res, next) => {
//     const { title, type_id, user_id } = req.body;
//     try {
//         const newConversation = await Conversations.create({ title, type_id, user_id });
//         res.status(201).send();
//     } catch (error) {
//         next(error);
//     }
// }


module.exports = {
    getAllConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getOneConversation,
    getAllConversationsInfo
}


