var Advertise = require('../models/Advertise'),
	Course = require('../models/Course'),
	Event = require('../models/Event'),
	Lector = require('../models/Lector'),
	Blog = require('../models/Blog');


function fn(express) {
	var router = express.Router();
	
	router.get('/', function(req, res, next) {
		Advertise.find(function(err, results) {
			if (err) return next(err);
			advertises = results;
			res.render('index', {
				advertises : advertises
			});
		})
	});

	// DATA GETS

	router.get('/advertise/get', function(req, res, next) {
		Advertise.find(function(err, results) {
			res.json(results)
		})
	})

	router.get('/course/get', function(req, res, next) {
		Course.find().populate('lector').exec(function(err, results) {
			res.json(results)
		})
	})

	router.get('/lector/get', function(req, res, next) {
		Lector.find().exec(function(err, results) {
			res.json(results)
		})
	})

	router.get('/blog/get', function(req, res, next) {
		Blog.find().exec(function(err, results) {
			res.json(results)
		})
	})

	router.get('/event/get', function(req, res, next) {
		Event.find().sort({
			date_start : 1
		}).populate('course').exec(function(err, results) {
			opts = {
				path : 'course.lector',
				model : 'Lector'
			};
			Event.populate(results, opts, function(err, ok) {
				if (err) return next(err);
				res.json(ok)
			})
		})
	})

	return router;
}

module.exports = fn;