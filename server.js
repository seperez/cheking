require('newrelic');

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose');

//Connect to mongodb database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/cheking');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB Connection error:'));
db.on('open', function(cb){
    console.log('DB Connected!');
});

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

/*
 * Auth Middleware - This will check if the token is valid
 * Only the requests that start with /api/v1/* will be checked for the token.
 * Any URL's that do not follow the below pattern should be avoided unless you
 * are sure that authentication is not needed
 */
app.all('/api/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next();
});

// Start the server
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});