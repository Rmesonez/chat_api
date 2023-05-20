const Users = require('../models/users.model');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');
require('dotenv').config();


const login = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user){
            return next({
                status: 400,
                name: 'invalid email',
                message: 'User not exist'
            });
        }
        const equals = await bcrypt.compare(req.body.password, user.password);
        if(!equals){
            return next({
                status: 400,
                name: 'Invalid password',
                message: 'The password does not match with user email'
            });
        }
        let token = jwt.sign({
            user: user
        }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN
        }, { algorithm: 'HS512' });
        user.token = token;
        delete user.dataValues.password;
        res.status(202).json({
            user: user,
            token: token
        });
    } catch (error) {
        next(error);
    }
}

const signup = async (req, res, next) => {
    try {
        let password = req.body.password = await  bcrypt.hash(req.body.password, Number.parseInt(process.env.ROUNDS));
        const {avatar, firstname, lastname, username, email} = req.body;
        const user = await Users.create({avatar, firstname, lastname, username, email, password});
            res.status(201).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    signup
}