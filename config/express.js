'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	// config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
	// 	require(path.resolve(modelPath));
	// });

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.facebookAppId = config.facebook.clientID;

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// // CookieParser should be above session
	// app.use(cookieParser());
	//
	// // Express MongoDB session storage
	// app.use(session({
	// 	saveUninitialized: true,
	// 	resave: true,
	// 	secret: config.sessionSecret,
	// 	store: new mongoStore({
	// 		db: db.connection.db,
	// 		collection: config.sessionCollection
	// 	})
	// }));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	app.all('/*', function(req, res, next) {
	    // CORS headers
	    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

	    // Set custom headers for CORS
	    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

	    next();
	});

	/*
	 * Auth Middleware - This will check if the token is valid
	 * Only the requests that start with /api/* will be checked for the token.
	 * Any URL's that do not follow the below pattern should be avoided unless you
	 * are sure that authentication is not needed
	 */
	app.all('/api/*', [require('./validateRequest')]);

	// Setting the app router
	var routes  = config.getGlobbedPaths('./routes/**/*.routes.js');
	routes.forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).json({
			message: 'Oops something went wrong'
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).json({
			message: 'Not Found'
		});
	});

	// Return Express server instance
	return app;
};
