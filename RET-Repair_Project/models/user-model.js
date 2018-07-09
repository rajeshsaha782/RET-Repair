var db = require('./db');
module.exports = {
	validateUser: function(Email, Password, callback){
		var sql = "SELECT * FROM users WHERE Email=? AND Password=?";
		var sqlParam = [Email, Password];
		db.executeQuery(sql, sqlParam, function(result){
			if(!result)
			{
				callback(false);
			}
			else
			{
				callback(result.length != 0);
			}
		});
	},


	getByEmail: function(Email, callback){
		var sql = "SELECT * FROM users WHERE Email=?";
		db.executeQuery(sql, [Email], function(result){
			callback(result[0]);
		});
	},

	getById: function(Id, callback){
		var sql = "SELECT * FROM users WHERE ID=?";
		db.executeQuery(sql, [Id], function(result){
			callback(result[0]);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM users";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	getAllCustomers: function(callback){
		var sql = "SELECT * FROM users WHERE Type='Customer'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	getAllExperts: function(callback){
		var sql = "SELECT * FROM users WHERE Type='Expert'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},


	update: function(id,name,type,address,phonenumber, callback){
		var sql = "UPDATE users SET Name=?, Type=?, Address=?, PhoneNumber=? WHERE ID=?";
		db.executeQuery(sql, [name,type,address,phonenumber,id], function(result){
			callback(result);
		})
	},

	updatePassword: function(Password,id, callback){
		var sql = "UPDATE users SET Password=? WHERE ID=?";
		db.executeQuery(sql, [Password,id], function(result){
			callback(result);
		})
	},


};
