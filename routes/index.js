var News = require('../models/News');

function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.render('index');
	});

	return router;
}

module.exports = fn;