const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Types = require('../models/types.model');


const Conversations = db.define('conversations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});

Conversations.belongsTo(Types, { foreignKey: 'type_id' });

Types.hasMany(Conversations, { foreignKey: 'type_id' });

module.exports = Conversations;