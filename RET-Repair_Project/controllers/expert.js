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
		DashboardViewModel.userName=result.Name;
		//console.log(DashboardViewModel);
			
		requestModel.getRequestByExpertIdwithCustomer(DashboardViewModel.userId,function(result1)
		{
			DashboardViewModel.Services=result1;
			//console.log(DashboardViewModel);

			requestModel.getAllCompletedServiceByExpertId(DashboardViewModel.userId,function(result1)
			{
				DashboardViewModel.TotalCompletedServices=result1.length;
				//console.log(DashboardViewModel);

				requestModel.getAllCanceledServiceByExpertId(DashboardViewModel.userId,function(result1)
				{
					DashboardViewModel.TotalCancelsdServices=result1.length;
					//console.log(DashboardViewModel);

					requestModel.getAllPendingServiceByExpertId(DashboardViewModel.userId,function(result1)
					{
						DashboardViewModel.TotalPendingServices=result1.length;
						//console.log(DashboardViewModel);

						requestModel.getAllOnGoingServiceByExpertId(DashboardViewModel.userId,function(result1)
						{
							DashboardViewModel.TotalOnGoingServices=result1.length;
							//console.log(DashboardViewModel);

							res.render('expert/Dashboard',{DashboardViewModel});
						});
					});
				});
			});
		});

		
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
			res.render('expert/Change_password',{userId:result.ID});
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

	var userEmail=req.session.username;
		userModel.getByEmail(userEmail,function(user)
		{
				requestModel.getRequestByExpertIdwithCustomer(user.ID,function(result)
				{
					console.log(result);
							res.render('expert/service_provider_requests',{Services: result,userId:user.ID,userName:user.Name});
				});
				
		});
	
	//res.send('Hello');
});

router.get('/sevice_provider_user_request_details/:RequestId', function(req, res){


var userEmail=req.session.username;
var RequestId = req.params.RequestId;
		userModel.getByEmail(userEmail,function(user)
		{
				//console.log(result);

				requestModel.getRequestByIdwithCustomer(RequestId,function(result)
				{
					console.log(result);

					res.render('expert/sevice_provider_user_request_details',{CustomerRequestInfo:result,userId:user.ID});
				});
				

		});
	

});

router.get('/confirmRequest/:id', function(req, res){

	var id=req.params.id;
	requestModel.confirmRequest(id,function(obj){
		
		res.redirect("../sevice_provider_user_request_details/"+id);
	});
	//res.send('Hello');
});

router.post('/billingProcess/:id', function(req, res){

	var id=req.params.id;
	var paymentdesc=req.body.billComponents;
	var totalcost=req.body.totalprice;
	requestModel.billingProcess(paymentdesc,totalcost,id,function(obj){
		
		res.redirect("../sevice_provider_user_request_details/"+id);
	});
	//res.send('Hello');
});

module.exports = router;