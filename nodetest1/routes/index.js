var express = require('express');
var router = express.Router();
var os = require('os');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express1' });
});

router.get('/ipaddr', function(req, res, next) {
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
    		for (var k2 in interfaces[k]) {
        		var address = interfaces[k][k2];
        		if (address.family === 'IPv4' && !address.internal) {
            			addresses.push(address.address);
        		}
    		}
	}
	res.json({ipaddress: addresses[0]});	
});

router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('furniture');
    var nameToFind = req.query.name;
    if(typeof nameToFind != 'undefined') {
    	var nameToFind = req.query.name;
    	collection.find({name: nameToFind },{},function(e,docs){
        	res.json({documents: docs});
    	});
    }
    else {
    	collection.findOne({},function(e,docs){
        	res.json({documents: docs});
    	});
    }
});

module.exports = router;
