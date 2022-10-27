module.exports = function (app) {
    var router = require("express").Router();
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
}