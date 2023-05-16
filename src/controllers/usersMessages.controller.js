const UsersMessages = require('../models/usersMessages.model');

const getAllUsersMessages = async (req, res) => {
    try {
        const getUsersMessages = await UsersMessages.findAll({
        });
        res.status(200).json(getUsersMessages);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the UsersMessages',
        });
    }
}

const createUserMessage = async (req, res) => {
    const { user_id, message_id } = req.body;
    try {
        const newUserMessage = await UsersMessages.create({ user_id, message_id });
        res.status(201).json(newUserMessage);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot create a UserMessage',
        });
    }
}

const updateUserMessage = async (req, res) => {
    const { user_id, message_id } = req.body;
    try {
        const updateUserMessage = await UsersMessages.update(
            { user_id, message_id },
            { where: { id: req.params.id }
        });
        res.status(202).json(updateUserMessage);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot update a UserMessage',
        });
    }
}

const deleteUserMessage = async (req, res) => {
    try {
        await UsersMessages.destroy({ where: { id: req.params.id } });
        res.status(204).json({
            message: 'UserMessage deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot delete a userMessage',
        });
    }
}

const getOneUserMessage = async (req, res) => {
    try{
        const getUserMessage = await UsersMessages.findOne(
            { where: { id: req.params.id },
        });
        res.status(200).json(getUserMessage);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the UserMessage',
        });
    }
}

module.exports = {
    getAllUsersMessages,
    createUserMessage,
    updateUserMessage,
    deleteUserMessage,
    getOneUserMessage
}
