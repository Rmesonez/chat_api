const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Conversations = require('../models/conversations.model');


const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
},{
    timestamps: false
});

Users.hasMany(Conversations, { foreignKey: 'user_id' });

Conversations.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Users;