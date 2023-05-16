const Users  = require('../models/users.model');
const Conversations = require('../models/conversations.model');
const Messages = require('../models/messages.model');
const Types = require('../models/types.model');


const getAllUsers = async (req, res) => {
    try {
        const getUsers = await Users.findAll({
            attributes: ['id', 'firstname', 'lastname', 'username', 'email']
        });
        res.status(200).json(getUsers);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the Users',
        });
    }
};

// const createUser = async (req, res) => {
//     const { firstname, lastname, username, email, password } = req.body;
//     try {
//         const newUser = await Users.create({ firstname, lastname, username, email, password, username, email, password });
//         res.status(201).json(newUser);
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Something went wrong cannot create a User',
//         });
//     }
// };

const updateUser = async (req, res) => {
    const {firstname, lastname, username } = req.body;
    try {
        const updateUser = await Users.update(
            { firstname, lastname, username },
            { where: { id: req.params.id }
        });
        res.status(202).json(updateUser);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot update a User',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await Users.destroy({ where: { id: req.params.id } });
        res.status(204).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot delete a user',
        });
    }
};

const getOneUser = async (req, res) => {
    try{
        const getUser = await Users.findOne(
            { where: { id: req.params.id },
            attributes: ['id', 'firstname', 'lastname', 'username', 'email'],
            include: [  
                { model: Conversations, attributes: ['id', 'title'], include: [{ model: Types, attributes: ['id', 'type'] }] },
                { model: Messages, attributes: ['id', 'content'] },
            ]
        });
        if(!getUser){
            return res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json(getUser);
    }   catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get a User',
        });
    }
};



module.exports = {
    getAllUsers,
    //createUser,
    updateUser,
    deleteUser,
    getOneUser,
};
