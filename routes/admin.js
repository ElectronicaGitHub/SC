var Advertise = require('../models/Advertise'),
	Course = require('../models/Course'),
	Event = require('../models/Event'),
	Lector = require('../models/Lector'),
	Blog = require('../models/Blog');

function admin(express, config) {
	var router = express.Router();

	router.use(function(req, res, next) {
	    var auth;
	    console.log('middleware just in admin view');
	    if (req.headers.authorization) {
	      auth = new Buffer(req.headers.authorization.substring(6), 'base64')
	        .toString()
	        .split(':');
	    }
	    if (!auth || 
	         auth[0] !== config.get('autentification:username') || 
	         auth[1] !== config.get('autentification:password')
	        ) {
	        res.statusCode = 401;
	        res.setHeader('WWW-Authenticate', 'Basic realm="Server God asks for your password sick hacker!!! Tell him!"');
	        res.render('denied')
	    } else {
	        next();
	    }
	});

	router.get('/', function(req, res) {
		res.render('admin');
	});

	// Advertises

	router.post('/advertise/', function(req, res, next) {
		advertise = new Advertise(req.body);
		advertise.save(function(err) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.post('/advertise/:id', function(req, res, next) {
		var advertise = req.body;
		delete advertise._id;
		Advertise.findByIdAndUpdate(req.params.id, advertise, function(err, result) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.delete('/advertise/:id', function(req, res, next) {
		Advertise.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('article deleted');
		})
	});

	// Courses

	router.post('/course/', function(req, res, next) {
		course = new Course(req.body);
		course.save(function(err) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.post('/course/:id', function(req, res, next) {
		var course = req.body;
		delete course._id;
		Course.findByIdAndUpdate(req.params.id, course, function(err, result) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.delete('/course/:id', function(req, res, next) {
		Course.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('article deleted');
		})
	});

	// Events

	router.post('/event/', function(req, res, next) {
		event_ = new Event(req.body);
		event_.save(function(err) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.post('/event/:id', function(req, res, next) {
		var event_ = req.body;
		delete event_._id;
		Event.findByIdAndUpdate(req.params.id, event_, function(err, result) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.delete('/event/:id', function(req, res, next) {
		Event.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('article deleted');
		})
	});

	// Lector

	router.post('/lector/', function(req, res, next) {
		lector = new Lector(req.body);
		lector.save(function(err) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.post('/lector/:id', function(req, res, next) {
		var lector = req.body;
		delete lector._id;
		Lector.findByIdAndUpdate(req.params.id, lector, function(err, result) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.delete('/lector/:id', function(req, res, next) {
		Lector.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('article deleted');
		})
	});

	// Blog

	router.post('/blog/', function(req, res, next) {
		blog = new Blog(req.body);
		blog.save(function(err) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.post('/blog/:id', function(req, res, next) {
		var blog = req.body;
		delete blog._id;
		Blog.findByIdAndUpdate(req.params.id, blog, function(err, result) {
			if (err) return next(err);
			res.json({
				save: true
			})
		})
	});
	router.delete('/blog/:id', function(req, res, next) {
		Blog.findByIdAndRemove(req.params.id, function(err, result) {
			if (err) return next(err);
			res.json('article deleted');
		})
	});


	return router;
}

module.exports = admin;