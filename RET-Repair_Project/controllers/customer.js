var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var requestModel = require.main.require('./models/request-model');

router.get('/Dashboard_user', function(req, res){

	var DashboardViewModel=new Object();
	var userEmail=req.session.username;
	
	userModel.getByEmail(userEmail,function(result)
				{
				DashboardViewModel.userId=result.ID;
				console.log(DashboardViewModel);
				
				requestModel.getRequestByCustomerIdwithExpert(DashboardViewModel.userId,function(result){
					DashboardViewModel.Requests=result;
					
					res.render('customer/Dashboard_user', {DashboardViewModel});
					});
					

					
				});
				
				
});

router.get('/Change_password', function(req, res){

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



module.exports = router;
