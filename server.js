// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/app/public')));

// Middlewares parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

require(path.join(__dirname, '/app/routing/apiRoutes'))(app);
require(path.join(__dirname, '/app/routing/htmlRoutes'))(app);

app.listen(PORT, function() {
    console.log('App is listening on PORT:  ' + PORT);
    console.log('Please, visit http://localhost:'+PORT);
});