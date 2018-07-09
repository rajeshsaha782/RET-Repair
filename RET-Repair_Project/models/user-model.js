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
	}
};
