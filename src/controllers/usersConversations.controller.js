const UsersConversations = require('../models/usersConversations.model');

const getAllUsersConversations = async (req, res, next) => {
    try {
        const getUsersConversations = await UsersConversations.findAll({
        });
        res.status(200).json(getUsersConversations);
    } catch (error) {
        next(error);
    }
}

const createUserConversation = async (req, res, next) => {
    const { user_id, conversation_id } = req.body;
    try {
        const newUserConversation = await UsersConversations.create({ user_id, conversation_id });
        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

const updateUserConversation = async (req, res, next) => {
    const { user_id, conversation_id } = req.body;
    try {
        const updateUserConversation = await UsersConversations.update(
            { user_id, conversation_id },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        next(error);
    }
}

const deleteUserConversation = async (req, res, next) => {
    try {
        await UsersConversations.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const getOneUserConversation = async (req, res, next) => {
    try{
        const getUserConversation = await UsersConversations.findOne(
            { where: { id: req.params.id },
        });
        res.status(200).json(getUserConversation);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getAllUsersConversations,
    createUserConversation,
    updateUserConversation,
    deleteUserConversation,
    getOneUserConversation
}
