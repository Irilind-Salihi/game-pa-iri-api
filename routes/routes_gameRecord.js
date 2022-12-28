const express = require('express')
const router = express.Router()
const db = require('../db/database')
const GameRecord = require('../models/gameRecordModel')
const { extractBearerToken, checkTokenMiddleware } = require('../middleware/token_check')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/jwt_config')



//post route to create a game record
router.post('/', (req, res) => {
    const username = req.body.username
    const nbTurn = req.body.nbTurn
    const sawmill = req.body.sawmill
    const mine = req.body.mine
    const barracks = req.body.barracks
    const bank = req.body.bank
    const karma = req.body.karma
    //Use model to create my gamerecord
    GameRecord.create({
        username: username,
        nbTurn: nbTurn,
        sawmill: sawmill,
        mine: mine,
        barracks: barracks,
        bank: bank,
        karma: karma,
    })
        .then(gameRecord => res.json(gameRecord))
        .catch(err =>res.json(err))
})

//post route to search a game for a specific user
router.post('/search', (req, res) => {
    const username = req.body.username

    GameRecord.findOne({
        where: {"username" : username},
        order : [[ 'createdAt', 'DESC']]
    })
        .then(gameRecord => res.json(gameRecord))
        .catch(err =>res.json(err))
})

//get route to get the three player with the best karma
router.get('/goodKarma', (req, res) => {
    GameRecord.findAll({
        attributes :['username'],
        limit: 3,
        distinct : "username",
        order : [[ 'karma', 'DESC']]
    })
        .then(gameRecord => res.json(gameRecord))
        .catch(err =>res.json(err))
})
//get route to get the three player with the worse karma
router.get('/badKarma', (req, res) => {
    GameRecord.findAll({
        attributes :['username'],
        limit: 3,
        distinct : "username",
        order : [[ 'karma', 'ASC']]
    })
        .then(gameRecord => res.json(gameRecord))
        .catch(err =>res.json(err))
})



module.exports = router;