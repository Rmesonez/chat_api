const Users = require('../models/users.model');
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');
require('dotenv').config();


const login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            const equals = bcrypt.compareSync(req.body.password, user.password);
            if (equals) {
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
            } else {
                res.status(401).json({
                    message: 'Invalid password'
                });
            }
        } else {
            res.status(401).json({
                message: 'Invalid email'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Invalid data',
            error
        });
        console.log(error);
    }
}

const signup = async (req, res) => {
    try {
        let password = req.body.password = bcrypt.hashSync(req.body.password, Number.parseInt(process.env.ROUNDS));
        const {avatar, firstname, lastname, username, email} = req.body;
        const user = await Users.create({avatar, firstname, lastname, username, email, password});
        const token = jwt.sign({
            user: user
        }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN
            }, { algorithm: 'HS512' });
            user.token = token;
            delete user.dataValues.password;
            res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid data',
            error
        });
        console.log(error);
    }
}

module.exports = {
    login,
    signup
}