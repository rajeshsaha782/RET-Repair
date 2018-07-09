var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
	req.session.destroy(function(err){
		res.redirect('/home');
	});
});

module.exports = router;