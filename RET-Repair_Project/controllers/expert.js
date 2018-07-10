var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var requestModel = require.main.require('./models/request-model');

router.get('/Dashboard', function(req, res){

	var DashboardViewModel=new Object();
	var userEmail=req.session.username;
	
	userModel.getByEmail(userEmail,function(result)
	{
		DashboardViewModel.userId=result.ID;
		//console.log(DashboardViewModel);
			


		res.render('expert/Dashboard', {DashboardViewModel});
	});
				
				
});



router.get('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('expert/Edit_profile',obj);
	});
	
	
});
router.post('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	var name = req.body.name;
	var address = req.body.address;
	var phonenumber = req.body.phonenumber;

	userModel.updateCustomer(id,name,address,phonenumber, function(obj){
		console.log(name);
		userModel.getById(id, function(obj){
			res.render('expert/View_member',obj);
		});
		
	});
	
	
});



router.get('/Change_password', function(req, res){

var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('admin/Change_password',{userId:result.ID});
	});

	
});
router.post('/Change_password', function(req, res){

	var oldPass = req.body.oldPass;
	var newPass = req.body.newPass;
	var rePass = req.body.rePass;
	var userEmail=req.session.username;

	userModel.getByEmail(userEmail,function(result)
	{
		var id=result.ID;
		userModel.updatePassword(rePass,id, function(obj){

			res.send("Password Changed");
		});
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

module.exports = router;