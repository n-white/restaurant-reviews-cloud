var parser = require('body-parser');
var morgan = require('morgan');
var express = require('express');
var routes = require('./routes.js');

var app = express();

app.use(morgan('dev'));
app.use(parser.json());
app.use('/', routes);
app.use(express.static('client'));

app.listen(3000, function() {
	console.log('listening on port 3000');
})

module.exports = app; 