const { Router } = require('express');
const router = Router();
const Users = require('../models/users.model');
const { 
    getAllUsers,
    //createUser,
    updateUser,
    deleteUser,
    getOneUser,
    getAllUsersInfo
} = require('../controllers/users.controller');
const { validateUpdate } = require('../validators/users.validators');


//get all users
router.get('/api/users', getAllUsers);

//get all users info
router.get('/api/users/info', getAllUsersInfo);


//get a user by id
router.get('/api/users/:id', getOneUser);

//update a user by id
router.put('/api/users/:id',validateUpdate, updateUser);

//delete a user by id
router.delete('/api/users/:id', deleteUser);


module.exports = router;