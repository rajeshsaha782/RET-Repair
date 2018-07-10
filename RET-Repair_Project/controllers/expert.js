var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/Dashboard', function(req, res){

	var DashboardViewModel=new Object();
	var userEmail=req.session.username;
	
	userModel.getByEmail(userEmail,function(result)
				{
				DashboardViewModel.userId=result.ID;
				console.log(DashboardViewModel);
					


					res.render('expert/Dashboard', {DashboardViewModel});
				});
				
				
});

router.get('/message', function(req, res){

	res.render('expert/message');
	//res.send('Hello');
});

router.get('/messages_filter_none', function(req, res){

	res.render('expert/messages_filter_none');
	//res.send('Hello');
});

router.get('/messages_filter_unseen', function(req, res){

	res.render('expert/messages_filter_unseen');
	//res.send('Hello');
});

router.get('/navbar', function(req, res){

	res.render('expert/navbar');
	//res.send('Hello');
});

router.get('/service_provider_requests', function(req, res){

	res.render('expert/service_provider_requests');
	//res.send('Hello');
});

router.get('/sevice_provider_user_request_details', function(req, res){

	res.render('expert/sevice_provider_user_request_details');
	//res.send('Hello');
});

