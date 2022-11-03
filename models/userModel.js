const Sequelize = require('sequelize');
const db = require ('../db/database');

const User = db.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    Sequelize,
    modelName: 'User'
});

module.exports = User;
