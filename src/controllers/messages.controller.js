const Messages = require('../models/messages.model');
const Conversations = require('../models/conversations.model');
const Users = require('../models/users.model');
const Types = require('../models/types.model');

const getAllMessages = async (req, res, next) => {
    try {
        const getMessages = await Messages.findAll({
            attributes: ['id', 'content'],
            include: [
                {
                    model: Users,
                    attributes: ['id', 'username'],
                },
            ],
        });
        res.status(200).json(getMessages);
    } catch (error) {
        next(error);
    }
}

const createMessage = async (req, res, next) => {
    const { content, user_id, conversation_id } = req.body;
    try {
        const newMessage = await Messages.create({ content, user_id, conversation_id });
        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

const updateMessage = async (req, res, next) => {
    const { content, user_id, conversation_id } = req.body;
    try {
        const updateMessage = await Messages.update(
            { content, user_id, conversation_id },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        next(error);
    }
}

const deleteMessage = async (req, res, next) => {
    try {
        await Messages.destroy({ where: { id: req.params.id } });
        res.status(204).sen();
    } catch (error) {
        next(error);
    }
}

const getOneMessage = async (req, res, next) => {
    try{
        const getMessage = await Messages.findOne(
            { where: { id: req.params.id },
            attributes: ['id', 'content'],
            include: [
                {
                    model: Users,
                    attributes: ['id', 'username', 'email'],
                    include: [{
                        model: Conversations,
                        attributes: ['id', 'title'],
                        include: [{
                            model: Types,
                            attributes: ['type']
                        }]
                    }]
                }
            ]
        });
        res.status(200).json(getMessage);
    } catch (error) {
        next(error);
    }
}

const getAllMessagesInfo = async (req, res, next) => {
    try {
        const getMessages = await Messages.findAll({
            attributes: ['id', 'content'],
            include: [
                {
                    model: Conversations,
                    attributes: ['id', 'title'],
                    include: [{
                        model: Types,
                        attributes: ['type']
                    }]
                },
                {
                    model: Users,
                    attributes: ['id', 'username', 'email']
                }
            ]
        });
        res.status(200).json(getMessages);
    } catch (error) {
        next(error);
    }
}

const deleteAllMessages = async (req, res, next) => {
    try {
        await Messages.destroy({ where: { user_id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}




module.exports = {
    getAllMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    getOneMessage,
    getAllMessagesInfo,
    deleteAllMessages
}
