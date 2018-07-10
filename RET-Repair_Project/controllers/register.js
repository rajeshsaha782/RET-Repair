var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
	res.render('register');
	//res.send('Hello');
});

router.post('/', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var type = "Customer";
	var pass = req.body.password;
	var address = req.body.address;
	var phonenumber = req.body.phonenumber;
	
	

	userModel.insert(name,email,type,pass,address,phonenumber, function(obj){
			console.log(obj);
			res.render("login");
		});

});

module.exports = router;