const express = require('express')
const router = express.Router()
const db = require('../db/database')
const GameRecord = require('../models/gameRecordModel')
const { extractBearerToken, checkTokenMiddleware } = require('../middleware/token_check')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/jwt_config')



//create user route
router.post('/', (req, res) => {
    const username = req.body.username
    const nbTurn = req.body.nbTurn
    const sawmill = req.body.sawmill
    const mine = req.body.mine
    const barracks = req.body.barracks
    const bank = req.body.bank
    const karma = req.body.karma
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

router.post('/search', (req, res) => {
    const username = req.body.username

    GameRecord.findOne({
        where: {"username" : username},
        order : [[ 'createdAt', 'DESC']]
    })
        .then(gameRecord => res.json(gameRecord))
        .catch(err =>res.json(err))
})

module.exports = router;