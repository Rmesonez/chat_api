const Messages = require('../models/messages.model');
const Conversations = require('../models/conversations.model');
const Users = require('../models/users.model');
const Types = require('../models/types.model');

const getAllMessages = async (req, res) => {
    try {
        const getMessages = await Messages.findAll({
            attributes: ['id', 'content'],
        });
        res.status(200).json(getMessages);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the Messages',
        });
    }
}

const createMessage = async (req, res) => {
    const { content, user_id, conversation_id } = req.body;
    try {
        const newMessage = await Messages.create({ content, user_id, conversation_id });
        res.status(201).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot create a Message',
        });
    }
}

const updateMessage = async (req, res) => {
    const { content, user_id, conversation_id } = req.body;
    try {
        const updateMessage = await Messages.update(
            { content, user_id, conversation_id },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot update a Message',
        });
    }
}

const deleteMessage = async (req, res) => {
    try {
        await Messages.destroy({ where: { id: req.params.id } });
        res.status(204).sen();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot delete a Message',
        });
    }
}

const getOneMessage = async (req, res) => {
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
        return res.status(500).json({
            message: 'Something went wrong cannot get the Message',
        });
    }
}

const getAllMessagesInfo = async (req, res) => {
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
        return res.status(500).json({
            message: 'Something went wrong cannot get the Messages',
        });
    }
}

module.exports = {
    getAllMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    getOneMessage,
    getAllMessagesInfo
}
