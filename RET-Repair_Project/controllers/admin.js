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
					


					res.render('admin/Dashboard', {DashboardViewModel});
				});
			});
		
		});


		
	});

	
	
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

	//res.send('Hello');
});

router.get('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('admin/Edit_profile',obj);
	});
	
	//res.send('Hello');
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


router.get('/View_member/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('admin/View_member',obj);
	});

	//res.send('Hello');
});


module.exports = router;