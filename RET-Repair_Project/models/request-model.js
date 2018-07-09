var db = require('./db');
module.exports = 
{

	getAllCancelService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='Cancel'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
	
	addRequest: function(customerid,expertid,servicetype,problemdesc, callback){
		var sql = "INSERT INTO `requests` ( `CustomerID`, `ExpertID`, `ServiceType`, `ProblemDescription`, `PaymentDescription`, `RequestingDate`, `Payment`, `Status`) VALUES ( ?, ?, ?, ?, NULL, CURRENT_TIMESTAMP, NULL, 'Pending')";
		db.executeQuery(sql, [customerid,expertid,servicetype,problemdesc], function(result){
			callback(result);
		})
	},
	
	confirmRequest: function(id, callback){
		var sql = "UPDATE requests SET Status = 'Confirmed' WHERE RequestID = ?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		})
	},
	
	cancelRequest: function(id, callback){
		var sql = "UPDATE requests SET Status = 'Canceled' WHERE RequestID = ?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		})
	},
	
	ongoingRequest: function(id, callback){
		var sql = "UPDATE requests SET Status = 'On Going' WHERE RequestID = ?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		})
	},
	
	paymentRequest: function(paymentdesc,payment,id, callback){
		var sql = "UPDATE requests SET PaymentDescription = ?, Payment= ? WHERE RequestID = ?";
		db.executeQuery(sql, [paymentdesc,payment,id], function(result){
			callback(result);
		})
	},
	
	completeRequest: function(id, callback){
		var sql = "UPDATE requests SET Status = 'Completed' WHERE RequestID = ?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		})
	},

};
