const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Users = require('./users.model');
const Conversations = require('./conversations.model')


const usersConversations = db.define('users_conversations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
},{
    timestamps: false
});

Users.belongsToMany(Conversations, { through: usersConversations, foreignKey: 'user_id' });

Conversations.belongsToMany(Users, { through: usersConversations, foreignKey: 'conversation_id' });


module.exports = usersConversations;