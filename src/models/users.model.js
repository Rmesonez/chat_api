const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Messages = require('./messages.model');


const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: null,
        defaultValue: "https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"
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

Users.hasMany(Messages, { foreignKey: 'user_id' });

Messages.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Users;