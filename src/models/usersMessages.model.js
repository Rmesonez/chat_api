const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Users = require('../models/users.model');
const Messages = require('../models/messages.model');


const usersMessages = db.define('users_messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
},{
    timestamps: false
});

Users.belongsToMany(Messages, { through: usersMessages, foreignKey: 'user_id' });

Messages.belongsToMany(Users, { through: usersMessages, foreignKey: 'message_id' });


module.exports = usersMessages;