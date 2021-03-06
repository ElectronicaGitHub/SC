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
		});
	});

	router.get('/lectors', function(req, res, next) {	
		Lector.find().populate('courses').exec(function(err, results) {
			if (err) return next(err);
			res.render('lectors', {
				lectors : results
			});
		});
	})

	router.get('/news', function(req, res, next) {	
		Blog.find(function(err, results) {
			if (err) return next(err);
			res.render('news', {
				news : results
			});
		});
	})

	router.get('/courses', function(req, res, next) {	
		Course.find().populate('lector').exec(function(err, results) {
			if (err) return next(err);
			res.render('courses', {
				courses : results
			});
		});
	})

	router.get('/courses/:id', function(req, res, next) {
		Course.findById(req.params.id).populate('lector').exec(function(err, course) {
			if (err) return next(err);
			res.render('each-course', {
				course : course
			});
		});
	})

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

	router.get('/event/get/:id', function(req, res, next) {
		Event.find({course : req.params.id}).sort({
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