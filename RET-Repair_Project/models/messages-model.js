var db = require('./db');
module.exports = {
	
	getByRecieverID: function(id, callback){
		var sql = "SELECT * FROM messages WHERE RecieverID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	
	getByMessageID: function(id, callback){
		var sql = "SELECT * FROM reviews WHERE MessageID=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},
	
	
	insertMessage: function(senderid,recieverid,desc, callback){
		var sql = "INSERT INTO messages (RecieverID, SenderID, Time, MessageDescription, SeenStatus) VALUES (?,?,CURRENT_TIMESTAMP, ?,'Unseen')";
		db.executeQuery(sql, [senderid,recieverid,desc], function(result){
			callback(result[0]);
		});
	}
	
};