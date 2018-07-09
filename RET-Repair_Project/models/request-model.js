var db = require('./db');
module.exports = 
{

	getAllCancelService: function(callback){
		var sql = "SELECT * FROM requests WHERE Status='Cancel'";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	}

	


};
