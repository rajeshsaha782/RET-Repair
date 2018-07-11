var db = require('./db');
module.exports = 
{

	getAllCancelService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='Canceled'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	getAllPendingService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='Pending'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	getAllConfirmedService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='Confirmed'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	getAllOnGoingService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='OnGoing'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
	getAllCompletedService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='Completed'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	getAllService: function(callback){
		var sql = "SELECT * FROM requests";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},
	

	getAllCompletedServiceByExpertId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE ExpertID=? AND Status='Completed'";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getAllCompletedServiceByExpertIdWithExpertValues: function(id,callback){
		var sql = "SELECT *  FROM requests CROSS JOIN users WHERE requests.ExpertID=users.ID AND requests.ExpertID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getAllCanceledServiceByExpertId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE ExpertID=? AND Status='Canceled'";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getAllPendingServiceByExpertId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE ExpertID=? AND Status='Pending'";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getAllOnGoingServiceByExpertId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE ExpertID=? AND Status='OnGoing'";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getRequestByCustomerId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE CustomerID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	getCanceledRequestByCustomerId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE CustomerID=? AND Status='Canceled'";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	getCompletedRequestByCustomerId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE CustomerID=? AND Status='Completed'";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getRequestByExpertId: function(id,callback){
		var sql = "SELECT * FROM requests WHERE ExpertID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	
	getRequestById: function(id,callback){
		var sql = "SELECT * FROM requests WHERE RequestID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	getRequestByIdwithExpert: function(id,callback){
		var sql = "SELECT *  FROM requests CROSS JOIN users WHERE requests.ExpertID=users.ID AND requests.RequestID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getRequestByIdwithCustomer: function(id,callback){
		var sql = "SELECT *  FROM requests CROSS JOIN users WHERE requests.CustomerID=users.ID AND requests.RequestID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	
	getRequestByCustomerIdwithExpert: function(id,callback){
		var sql = "SELECT *  FROM requests CROSS JOIN users WHERE requests.ExpertID=users.ID AND requests.CustomerID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},

	getRequestByExpertIdwithCustomer: function(id,callback){
		var sql = "SELECT *  FROM requests CROSS JOIN users WHERE requests.CustomerID=users.ID AND requests.ExpertID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result);
		});
	},
	
	addRequest: function(customerid,expertid,servicetype,problemdesc, callback){
		var sql = "INSERT INTO requests  VALUES ( NULL,?, ?, ?, ?, NULL, CURRENT_TIMESTAMP, NULL, 'Pending')";
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
	
	countPendingRequest: function(callback){
		var sql = "SELECT COUNT(RequestID) FROM requests WHERE Status LIKE 'Pending'";
		db.executeQuery(sql,null, function(result){
			callback(result);
		})
	},
	
	countConfirmedRequest: function(callback){
		var sql = "SELECT COUNT(RequestID) FROM requests WHERE Status LIKE 'Confirmed'";
		db.executeQuery(sql,null, function(result){
			callback(result);
		})
	},
	
	countOnGoingRequest: function(callback){
		var sql = "SELECT COUNT(RequestID) FROM requests WHERE Status LIKE 'OnGoing'";
		db.executeQuery(sql,null, function(result){
			callback(result);
		})
	},
	
	countCompletedRequest: function(callback){
		var sql = "SELECT COUNT(RequestID) FROM requests WHERE Status LIKE 'Completed'";
		db.executeQuery(sql,null, function(result){
			callback(result);
		})
	},
	
	
	countCanceledRequest: function(callback){
		var sql = "SELECT COUNT(RequestID) FROM requests WHERE Status LIKE 'Canceled'";
		db.executeQuery(sql,null, function(result){
			callback(result);
		})
	},
	
	
	countAllRequest: function(callback){
		var sql = "SELECT COUNT(RequestID) FROM requests";
		db.executeQuery(sql,null, function(result){
			callback(result);
		})
	}

};
