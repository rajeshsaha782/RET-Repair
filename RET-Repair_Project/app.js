// DECLARATION
var express = require('express');
var app = express();
var port = 1337;
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mysql = require('mysql');

var home = require('./controllers/home');
var register = require('./controllers/register');
var admin = require('./controllers/admin');
var logout = require('./controllers/logout');
// var home = require('./controllers/home');


// CONFIGURATION
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'my top secret pass', saveUninitialized: true, resave: false}));


app.use('*', function(req, res, next){
	if(req.originalUrl == '/home' || req.originalUrl == '/register'|| req.originalUrl == '/logout' )
	{
		next();
	}
	else
	{
		if(!req.session.username)
		{
			res.redirect('/home');

			return;
		}
		next();
	}
});


// ROUTES
app.use('/home', home);
app.use('/register', register);
app.use('/admin', admin);
app.use('/logout', logout);
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