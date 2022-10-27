//Minimal express.js index.js file
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var jsonwebtoken = require('jsonwebtoken');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/routesAuth")(app);

//import routes
var routes = require('./routes/routesAuth');

SECRET = 'mysecret';
app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(port, function() {
    console.log('Server running on port: ' + port);
});