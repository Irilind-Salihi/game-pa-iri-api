const Sequelize = require('sequelize');
const db = require ('../db/database');

const GameRecord = db.define('gameRecord', {
    id_game: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sawmill: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mine: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    barracks: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bank: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    karma: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    Sequelize,
    modelName: 'GameRecord'
});

module.exports = User;
