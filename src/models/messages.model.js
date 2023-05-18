const { DataTypes } = require('sequelize');
const db = require('../database/database');

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
    }
},{
    timestamps: false
});

module.exports = Messages;