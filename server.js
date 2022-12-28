// Chargement des modules
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//db config import
const db = require('./db/database')
const PORT = 1234


//db connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

// Express Init
const app = express()

app.use(cors())                                 // Activation de CORS
app.use(express.json())                         // Activation du raw (json)
app.use(express.urlencoded({ extended: true })) // Activation de x-wwww-form-urlencoded



//Route for game record
app.use("/gameRecord", require("./routes/routes_gameRecord"))

//Default route
app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
})



//Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})