var db = require('./db');
module.exports = {
	
	getByExpertID: function(id, callback){
		var sql = "SELECT * FROM reviews WHERE ExpertID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	getByCustomerID: function(id, callback){
		var sql = "SELECT * FROM reviews WHERE CustomerID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	getAllReviews: function(id, callback){
		var sql = "SELECT * FROM reviews";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	insertReview: function(customerid,expertid,desc, callback){
		var sql = "INSERT INTO reviews  VALUES (NULL,?,?, ?)";
		db.executeQuery(sql, [customerid,expertid,desc], function(result){
			callback(result[0]);
		});
	}
};