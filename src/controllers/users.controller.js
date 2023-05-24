const Users  = require('../models/users.model');
const Conversations = require('../models/conversations.model');
const Messages = require('../models/messages.model');
const Types = require('../models/types.model');


const getAllUsers = async (req, res, next) => {
    try {
        const getUsers = await Users.findAll({
            attributes: ['id', 'avatar', 'firstname', 'lastname', 'username', 'email']
        });
        res.status(200).json(getUsers);
    } catch (error) {
        next(error);
    }
};


const updateUser = async (req, res, next) => {
    const {avatar, firstname, lastname, username } = req.body;
    try {
        const updateUser = await Users.update(
            { avatar, firstname, lastname, username },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await Users.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const getOneUser = async (req, res, next) => {
    try{
        const getUser = await Users.findOne(
            { where: { id: req.params.id },
            attributes: ['id', 'avatar', 'firstname', 'lastname', 'username', 'email'],
            include: [  
                { 
                    model: Conversations, attributes: ['id', 'title'], 
                    include: [
                        {
                            model: Types, attributes: ['id', 'type'],                            
                    },
                    // {
                    //     model: Messages, attributes: ['id', 'content'],
                    //     include: [
                    //         {
                    //             model: Users, as: 'createdBy', attributes: ['id', 'username']
                    //         }]
                    // }
                ] 
                },
            ]
        });
        if(!getUser){
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json(getUser);
    }   catch (error) {
        next(error);
    }
};

const getAllUsersInfo = async (req, res, next) => {
    try {
        const getUsers = await Users.findAll({
            attributes: ['id', 'avatar', 'firstname', 'lastname', 'username', 'email'],
            include: [  
                { 
                    model: Conversations, attributes: ['id', 'title'], 
                    include: [
                        {
                            model: Types, attributes: ['id', 'type'],                            
                    },
                    {
                        model: Messages, attributes: ['id', 'content'],
                        include: [
                            {
                                model: Users, attributes: ['id', 'username']
                            }]
                    }
                ] 
                },
            ]
        });
        res.status(200).json(getUsers);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllUsers,
    //createUser,
    updateUser,
    deleteUser,
    getOneUser,
    getAllUsersInfo
};
