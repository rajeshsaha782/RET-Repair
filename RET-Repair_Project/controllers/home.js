var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
	res.render('Home');
	//res.send('Hello');
});


router.post('/', function(req, res){
	var Email = req.body.email;
	var Password= req.body.password;
	userModel.validateUser(Email, Password, function(status){
		console.log(status);
		if(status)
		{
			req.session.username = Email;
			userModel.getByEmail(Email, function(user){
				if(user.Type=="Admin")
				{
					res.redirect('/admin/dashboard');
				}
				else if(user.Type=="Customer")
				{
					res.redirect('/customer/index');
				}
				else if(user.Type=="Expert")
				{
					res.redirect('/expert/Dashboard');
				}
				else
				{
					res.send('Other user');
				}
			});

		}
		else
		{
			res.send('Invalid');
		}
	});
	
});


router.post('/register', function(req, res){
	//res.render('register');
	res.send('Hello');
});

module.exports = router;