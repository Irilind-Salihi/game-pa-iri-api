const express = require('express')
const router = express.Router()
const db = require('../db/database')
const User = require('../models/gameRecordModel')
const { extractBearerToken, checkTokenMiddleware } = require('../middleware/token_check')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/jwt_config')



//create user route
router.post('/', (req, res) => {
    const username = req.body.username
    const sawmill = req.body.sawmill
    const mine = req.body.mine
    const barracks = req.body.barracks
    const bank = req.body.bank
    const karma = req.body.karma
    User.create({
        username: username,
        sawmill: sawmill,
        mine: mine,
        barracks: barracks,
        bank: bank,
        karma: karma,
    })
        .then(user => res.json(user))
        .catch(err =>res.json(err))
})

module.exports = router;