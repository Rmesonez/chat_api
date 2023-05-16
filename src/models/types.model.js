const { DataTypes } = require('sequelize');
const db = require('../database/database');



const Types = db.define('types', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    }    
},{
    timestamps: false
});


module.exports = Types;