var db = require('./db');
module.exports = {
	
	getByExpertID: function(id, callback){
		var sql = "SELECT * FROM reviews WHERE ExpertID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	
	getByCustomerID: function(id, callback){
		var sql = "SELECT * FROM reviews WHERE CustomerID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	
	getAllReviews: function(id, callback){
		var sql = "SELECT * FROM reviews";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	
	insertReview: function(customerid,expertid,desc, callback){
		var sql = "INSERT INTO reviews (CustomerID, ExpertID, ReviewDescription) VALUES (?,?, ?)";
		db.executeQuery(sql, [customerid,expertid,desc], function(result){
			callback(result[0]);
		});
	}
};