const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Conversations = require('../models/conversations.model');

const Messages = db.define('messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});

Messages.belongsTo(Conversations, { foreignKey: 'conversation_id' });

Conversations.hasMany(Messages, { foreignKey: 'conversation_id' });

module.exports = Messages;