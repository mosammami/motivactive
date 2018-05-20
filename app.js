var express = require('express'),	
	session = require('express-session'),		
	morgan = require('morgan'),	
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	path = require('path'),
	settings = require('./init/settings'),
	winston = require('./init/winston'),
	adapter = require('./init/adapter'), // fire up connection to the database
	app = express();		

/*********************/
/*** Configuration ***/
/*********************/

app.set('port', settings.port || 8080);

app.use(morgan('dev')); 										// log every request to the console in development mode
app.use(cookieParser()); 										// parse cookies
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.urlencoded({ extended: true })); 			// parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); 				// access static files from root location

/**************/
/*** Routes ***/
/**************/

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.use('/api/users', require('./app/routes/users'));
app.use('/api/activities', require('./app/routes/activities'));

app.get('*', function (req, res) {
	res.redirect('/');
});

/**********************/
/*** Error Handling ***/
/**********************/

app.use(function (err, req, res, next) {

	if (!err.type) err.type = 'FatalError';

	// log error in files
	winston.error(err.type, { 
		error: err.stack 
	});

	// return error to user
	res.status(400);
	res.json({ type: err.type, message: err.message });
});

module.exports = app;