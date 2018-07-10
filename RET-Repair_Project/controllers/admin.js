var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var requestModel = require.main.require('./models/request-model');


router.get('/dashboard', function(req, res){
	
	var DashboardViewModel=new Object();
	var userEmail=req.session.username;
	console.log(userEmail);

	userModel.getAllCustomers(function(result)
	{
		DashboardViewModel.TotalCustomer=result.length;
		//console.log(DashboardViewModel.TotalCustomer);


		userModel.getAllExperts(function(result)
		{
			DashboardViewModel.TotalExpert=result.length;
			//console.log(DashboardViewModel);


			requestModel.getAllCancelService(function(result)
			{
			DashboardViewModel.TotalCancelService=result.length;
			//console.log(DashboardViewModel);
				


				userModel.getByEmail(userEmail,function(result)
				{
				DashboardViewModel.userId=result.ID;
				//console.log(DashboardViewModel);
					


					requestModel.getAllPendingService(function(result)
					{
						DashboardViewModel.TotalPendingService=result.length;
					//console.log(result);
						


						requestModel.getAllConfirmedService(function(result)
						{
							DashboardViewModel.TotalConfirmedService=result.length;
						//console.log(result);
							


							requestModel.getAllOnGoingService(function(result)
							{
								DashboardViewModel.TotalOnGoingService=result.length;
							//console.log(result);
								


								requestModel.getAllCompletedService(function(result)
								{
									DashboardViewModel.TotalCompletedService=result.length;
								//console.log(result);
									


									res.render('admin/Dashboard', {DashboardViewModel});
								});
							});
						});
					});
				});
			});
		
		});


		
	});

	
	
	
});


router.get('/Add_member', function(req, res){
	res.render('admin/Add_member');
	
});
router.post('/Add_member', function(req, res){

	
	var name = req.body.name;
	var email = req.body.email;
	var type = req.body.type;
	var pass = req.body.pass;
	var address = req.body.address;
	var phonenumber = req.body.phonenumber;
	
	

	userModel.insert(name,email,type,pass,address,phonenumber, function(obj){
			console.log(obj);
			res.redirect("View_member/"+obj.insertId);
		});


	// res.render('admin/Add_member');
	
});


router.get('/Change_password', function(req, res){
	res.render('admin/Change_password');
	
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

router.get('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('admin/Edit_profile',obj);
	});
	
	
});
router.post('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	var name = req.body.name;
	var type = req.body.type;
	var address = req.body.address;
	var phonenumber = req.body.phonenumber;

	userModel.update(id,name,type,address,phonenumber, function(obj){

		userModel.getById(id, function(obj){
			res.render('admin/View_member',obj);
		});
		
	});
	
	
});


router.get('/navbar', function(req, res){
	res.render('admin/navbar');
	
});


router.get('/Services', function(req, res){

	requestModel.getAllService(function(result){
		res.render('admin/Services', {Services: result});
	});

	
});


router.get('/View_All_Members', function(req, res){

	userModel.getAll(function(result){
		res.render('admin/View_All_Members', {Users: result});
	});
	
	
});


router.get('/View_member/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('admin/View_member',obj);
	});

	
});

router.get('/Delete/:id', function(req, res){

	var id = req.params.id;
	userModel.deleteById(id, function(obj){
		res.redirect('../View_All_Members');
	});

	
});


module.exports = router;