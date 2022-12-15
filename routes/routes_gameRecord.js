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
    const password = req.body.password
    User.create({
        username: username,
        password: password
    })
        .then(user => res.json(user))
        .catch(err =>res.json(err))
})

module.exports = router;