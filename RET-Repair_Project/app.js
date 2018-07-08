// DECLARATION
var express = require('express');
var app = express();
var port = 1337;
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mysql = require('mysql');

var login = require('./controllers/login');
// var logout = require('./controllers/logout');
// var home = require('./controllers/home');


// CONFIGURATION
app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'my top secret pass', saveUninitialized: true, resave: false}));

// ROUTES
app.use('/home', login);
// app.use('/logout', logout);
// app.use('/home', home);

app.get('/', function(req, res){
	console.log(req.session);
	req.session.name = 'ABCD';
	res.send('Value set');
});


// SERVER START
app.listen(port, function(){
	console.log('Server started successfully ...');
});