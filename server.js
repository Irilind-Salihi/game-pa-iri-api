// Chargement des modules
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
//import secret
const { SECRET } = require('./config/jwt_config')
//import middleware
const { extractBearerToken, checkTokenMiddleware } = require('./middleware/token_check')
const PORT = 1234

// Initialisation de Express 4
const app = express()

app.use(cors())                                 // Activation de CORS
app.use(express.json())                         // Activation du raw (json)
app.use(express.urlencoded({ extended: true })) // Activation de x-wwww-form-urlencoded

// Liste des utilisateurs
const users = [
    { id: 1, username: 'admin', password: 'password123' }
]

/* Ici les futures routes */
//route to say hello world
app.get('/hello', (req, res) => {
    return res.json({ message: 'Hello World' })
})

app.get('/me', checkTokenMiddleware, (req, res) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })

    return res.json({ content: decoded })
})

app.post('/register', (req, res) => {
    // Aucune information à traiter
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter username and password' })
    }

    // Checking
    const userExisting = users.find(u => u.username === req.body.username)

    // Pas bon
    if (userExisting) {
        return res.status(400).json({ message: `Error. User ${req.body.username} already existing` })
    }

    // Données du nouvel utilisateur
    const id = users[users.length - 1].id + 1
    const newUser = {
        id: id,
        username: req.body.username,
        password: req.body.password
    }

    // Insertion dans le tableau des utilisateurs
    users.push(newUser)

    return res.status(201).json({ message: `User ${id} created` })
})

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
})

/* Formulaire de connexion */
app.post('/login', (req, res) => {
    // Pas d'information à traiter
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
    }

    // Checking
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)

    // Pas bon
    if (!user) {
        return res.status(400).json({ message: 'Error. Wrong login or password' })
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, SECRET, { expiresIn: '3 hours' })

    return res.json({ access_token: token })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})