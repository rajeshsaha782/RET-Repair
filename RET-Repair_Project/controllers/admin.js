var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/dashboard', function(req, res){


	res.render('admin/Dashboard');
	//res.send('Hello');
});


router.get('/Add_member', function(req, res){
	res.render('admin/Add_member');
	//res.send('Hello');
});


router.get('/Change_password', function(req, res){
	res.render('admin/Change_password');
	//res.send('Hello');
});

router.get('/Edit_profile', function(req, res){
	res.render('admin/Edit_profile');
	//res.send('Hello');
});


router.get('/navbar', function(req, res){
	res.render('admin/navbar');
	//res.send('Hello');
});


router.get('/Services', function(req, res){
	res.render('admin/Services');
	//res.send('Hello');
});


router.get('/View_All_Members', function(req, res){

	userModel.getAll(function(result){
		res.render('admin/View_All_Members', {Users: result});
	});
	
	//res.send('Hello');
});


router.get('/View_member', function(req, res){
	res.render('admin/View_member');
	//res.send('Hello');
});


module.exports = router;