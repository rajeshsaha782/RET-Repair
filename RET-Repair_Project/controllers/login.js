var express = require('express');
var router = express.Router();
// var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
	res.render('Home');
	//res.send('Hello');
});

module.exports = router;