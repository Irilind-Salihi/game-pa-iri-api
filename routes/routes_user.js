const express = require('express')
const router = express.Router()
const db = require('../db/database')
const User = require('../models/userModel')
const { extractBearerToken, checkTokenMiddleware } = require('../middleware/token_check')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/jwt_config')


//login route with token check fuction
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
        .then(user => {
            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, SECRET.SECRET, { expiresIn: '100 hours' })
                res.json({success:true, access_token: token })
            } else {
                res.status(400).json({success : false ,message: 'Error. Wrong login or password' })
            }
        })
        .catch(err => console.log(err))
})


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