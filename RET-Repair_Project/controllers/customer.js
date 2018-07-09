var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/dashboard_user', function(req, res){

	res.render('customer/Dashboard_user');
	//res.send('Hello');
});

router.get('/Change_password', function(req, res){

	res.render('customer/Change_password');
	//res.send('Hello');
});

router.get('/Customer_request_status', function(req, res){

	res.render('customer/Customer_request_status');
	//res.send('Hello');
});

router.get('/Edit_profile', function(req, res){

	res.render('customer/Edit_profile');
	//res.send('Hello');
});

router.get('/index', function(req, res){

	res.render('customer/index');
	//res.send('Hello');
});

router.get('/message', function(req, res){

	res.render('customer/message');
	//res.send('Hello');
});

router.get('/messages_filter_none', function(req, res){

	res.render('customer/messages_filter_none');
	//res.send('Hello');
});

router.get('/messages_filter_unseen', function(req, res){

	res.render('customer/messages_filter_unseen');
	//res.send('Hello');
});

router.get('/my_reviews', function(req, res){

	res.render('customer/my_reviews');
	//res.send('Hello');
});

router.get('/navbar', function(req, res){

	res.render('customer/navbar');
	//res.send('Hello');
});

router.get('/request_details', function(req, res){

	res.render('customer/request_details');
	//res.send('Hello');
});

router.get('/request_server_details', function(req, res){

	res.render('customer/request_server_details');
	//res.send('Hello');
});

router.get('/request_server_filter_both', function(req, res){

	res.render('customer/request_server_filter_both');
	//res.send('Hello');
});

router.get('/request_server_filter_nearest', function(req, res){

	res.render('customer/request_server_filter_nearest');
	//res.send('Hello');
});

router.get('/request_server_filter_none', function(req, res){

	res.render('customer/request_server_filter_none');
	//res.send('Hello');
});

router.get('/request_server_filter_rating', function(req, res){

	res.render('customer/request_server_filter_rating');
	//res.send('Hello');
});

router.get('/Service_received', function(req, res){

	res.render('customer/Service_received');
	//res.send('Hello');
});



