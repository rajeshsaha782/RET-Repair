var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var requestModel = require.main.require('./models/request-model');

router.get('/Dashboard_user', function(req, res){

	var DashboardViewModel=new Object();
	var userEmail=req.session.username;
	
	userModel.getByEmail(userEmail,function(result1)
				{
				DashboardViewModel.userId=result1.ID;
				
				requestModel.getRequestByCustomerIdwithExpert(DashboardViewModel.userId,function(result2){
					DashboardViewModel.Requests=result2;
					
					requestModel.getCanceledRequestByCustomerId(DashboardViewModel.userId,function(result3){
						DashboardViewModel.CanceledRequests=result3;
						
						requestModel.getCompletedRequestByCustomerId(DashboardViewModel.userId,function(result4){
							DashboardViewModel.CompletedRequests=result4;
							
							res.render('customer/Dashboard_user', {DashboardViewModel});
						});
						
					});
					
					
					});
					

					
				});
				
				
});

router.get('/Change_password', function(req, res){

	var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('customer/Change_password',{userId:result.ID});
	});
	
	//res.send('Hello');
});

router.post('/Change_password', function(req, res){

	var userEmail=req.session.username;
	var pass=req.body.newPass;
	console.log(pass);
		userModel.getByEmail(userEmail,function(user)
		{
				console.log(user);
				userModel.updatePassword(pass,user.ID,function(result)
				{
					console.log(result);
					res.render('customer/Change_password');
				});
				
		});
	res.render('customer/Change_password');
	//res.send('Hello');
});

router.get('/Customer_request_status/:id', function(req, res){

	var id=req.params.id;
	requestModel.getRequestByIdwithExpert(id, function(obj){
		console.log(obj[0]["ExpertID"]);
		var object={
			
			  RequestID: obj[0]["RequestID"],
			  CustomerID: obj[0]["CustomerID"],
			  ExpertID: obj[0]["ExpertID"],
			  ServiceType: obj[0]["ServiceType"],
			  ProblemDescription: obj[0]["ProblemDescription"],
			  PaymentDescription: obj[0]["PaymentDescription"],
			  RequestingDate: obj[0]["RequestingDate"],
			  Payment: obj[0]["Payment"],
			  Status: obj[0]["Status"],
			  ID: obj[0]["ID"],
			  Name: obj[0]["Name"],
			  Email: obj[0]["Email"],
			  Password: obj[0]["Password"],
			  Address: obj[0]["Address"],
			  Type: obj[0]["Type"],
			  PhoneNumber: obj[0]["PhoneNumber"],
			  Rating: obj[0]["Rating"],
			  MinimumPayment: obj[0]["MinimumPayment"],
			  SignInDate: obj[0]["SignInDate"]
		}
			
		res.render('customer/Customer_request_status',{object});
	});
	//res.send('Hello');
});

router.get('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('customer/Edit_profile',obj);
	});
	
	//res.send('Hello');
});
router.post('/Edit_profile/:id', function(req, res){

	var id = req.params.id;
	var name = req.body.name;
	var address = req.body.address;
	var phonenumber = req.body.phonenumber;

	userModel.updateCustomer(id,name,address,phonenumber, function(obj){
		console.log(name);
		userModel.getById(id, function(obj){
			res.render('customer/View_member',obj);
		});
		
	});
	
	//res.send('Hello');
});

router.get('/View_member/:id', function(req, res){

	var id = req.params.id;
	userModel.getById(id, function(obj){
		res.render('customer/View_member',obj);
	});

});

router.get('/index', function(req, res){

	var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('customer/index',{userId:result.ID});
	});
	
	//res.send('Hello');
});

router.get('/message', function(req, res){

	var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('customer/message',{userId:result.ID});
	});
	
	//res.send('Hello');
});

router.get('/messages_filter_none', function(req, res){

	var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('customer/messages_filter_none',{userId:result.ID});
	});
	
	//res.send('Hello');
});

router.get('/messages_filter_unseen', function(req, res){

	var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('customer/messages_filter_unseen',{userId:result.ID});
	});
	
	
	//res.send('Hello');
});

router.get('/my_reviews', function(req, res){

	res.render('customer/my_reviews');
	//res.send('Hello');
});

router.get('/navbar', function(req, res){

	var userEmail=req.session.username;
	userModel.getByEmail(userEmail,function(result)
	{
			res.render('customer/navbar',{userId:result.ID});
	});
	
	//res.send('Hello');
});

router.get('/request_details/:type', function(req, res){
	
	var type=req.params.type;
	
	if(type=="tv")
	{
		req.session.ServiceType="Television";
	}
	else if(type=="ac")
	{
		req.session.ServiceType="AC";
	}
	else if(type=="freez")
	{
		req.session.ServiceType="Refrigerator";
	}
	else if(type=="pc")
	{
		req.session.ServiceType="Computer";
	}
	else if(type=="phn")
	{
		req.session.ServiceType="Phone";
	}
	else if(type=="other")
	{
		req.session.ServiceType="Others";
	}
	type=req.session.ServiceType;
	console.log(type);
	

	res.render('customer/request_details',{type});
	//res.send('Hello');
});

router.post('/request_details', function(req, res){
	
	var dis= req.body.district;
	var thana= req.body.thana;
	var description= req.body.description;
	req.session.Address=thana+","+dis;
	req.session.ProblemDescription=description;

	userModel.getAllExperts(function(obj){
		
		console.log(obj);
		
		res.render('customer/request_server_filter_none',{experts:obj});
	});
	//res.send('Hello');
});


router.get('/request_server_details/:id', function(req, res){

	var id=req.params.id;
	requestModel.getAllCompletedServiceByExpertIdWithExpertValues(id,function(obj){
		
		console.log(obj);
		
		res.render('customer/request_server_details',{expert:obj});
	});

	//res.send('Hello');
});

router.get('/request_server_filter_both', function(req, res){

	res.render('customer/request_server_filter_both');
	//res.send('Hello');
});

router.get('/addRequest/:id', function(req, res){

	var ExpertID=req.params.id;
	var Address=req.session.Address;
	var ProblemDesc=req.session.ProblemDescription ;
	var ServiceType=req.session.ServiceType;
	userModel.getByEmail(req.session.username,function(obj){
		
		var CustomerID=obj.ID;

		requestModel.addRequest(CustomerID,ExpertID,ServiceType,ProblemDesc,function(obj){
		
			res.redirect('../Dashboard_user');
		});
	});

	
	//res.send('Hello');
});

router.get('/request_server_filter_nearest', function(req, res){

	res.render('customer/request_server_filter_nearest');
	//res.send('Hello');
});

router.post('/request_server_filter_none', function(req, res){

	userModel.getAllExperts(function(obj){
		
		console.log(obj);
		console.log(obj[0].Rating);

		res.render('customer/request_server_filter_none',{experts:obj});
	});
	//res.send('Hello');
});

router.get('/request_server_filter_rating', function(req, res){

	res.render('customer/request_server_filter_rating');
	//res.send('Hello');
});

router.get('/Service_received/:id/:code', function(req, res){

	var id=req.params.id;
	var code=req.params.code;
	requestModel.getRequestByCustomerIdwithExpert(id,function(obj){
		
		console.log(code);
		
		res.render('customer/Service_received',{experts:obj,code,userId:id});
	});
	//res.send('Hello');
});



module.exports = router;
