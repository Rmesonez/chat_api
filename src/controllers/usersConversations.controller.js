const UsersConversations = require('../models/usersConversations.model');

const getAllUsersConversations = async (req, res) => {
    try {
        const getUsersConversations = await UsersConversations.findAll({
        });
        res.status(200).json(getUsersConversations);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the UsersMessages',
        });
    }
}

const createUserConversation = async (req, res) => {
    const { user_id, conversation_id } = req.body;
    try {
        const newUserConversation = await UsersConversations.create({ user_id, conversation_id });
        res.status(201).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot create a UserMessage',
        });
    }
}

const updateUserConversation = async (req, res) => {
    const { user_id, conversation_id } = req.body;
    try {
        const updateUserConversation = await UsersConversations.update(
            { user_id, conversation_id },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot update a UserMessage',
        });
    }
}

const deleteUserConversation = async (req, res) => {
    try {
        await UsersConversations.destroy({ where: { id: req.params.id } });
        res.status(204).sen();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot delete a userMessage',
        });
    }
}

const getOneUserConversation = async (req, res) => {
    try{
        const getUserConversation = await UsersConversations.findOne(
            { where: { id: req.params.id },
        });
        res.status(200).json(getUserConversation);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the UserMessage',
        });
    }
}

module.exports = {
    getAllUsersConversations,
    createUserConversation,
    updateUserConversation,
    deleteUserConversation,
    getOneUserConversation
}
