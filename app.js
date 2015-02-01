/*
 * Description: Web Gui for Database Release Manager module.
 * @author  Geaaru, geaaru@gmail.com
 * $Id$
 */

// -----------------------------------------------------------------------
// INCLUEDES MODULES
// -----------------------------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Internal modules
var auth = require('./lib/authentication');

// Include package.json
var packageData = require('./package.json');

// -----------------------------------------------------------------------
// INITIALIZE APP
// -----------------------------------------------------------------------
var app = express();
// -----------------------------------------------------------------------
// GLOBAL VARIABLES
// -----------------------------------------------------------------------
global.name = 'DBRM UI';
global.name_long = 'DataBase Release Manager Web UI';
global.version = packageData.version;
global.license = packageData.license;
global.loginPage = '/login';

// Set title
app.set('title', 'Database Release Manager WebGui')

// -----------------------------------------------------------------------
// ENGINES
// -----------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var dbrmUiAuth = auth.DbrmUiAuth(app);

// -----------------------------------------------------------------------
// INCLUEDES ROUTES
// -----------------------------------------------------------------------
var routes = require('./routes/index');
var route_login = require('./routes/login');
var route_logout = require('./routes/logout');
var route_users = require('./routes/users');

// -----------------------------------------------------------------------
// ROUTES
// -----------------------------------------------------------------------
app.use('/', routes);
app.use(global.loginPage, route_login);
app.use('/logout', route_logout);
app.use('/users', route_users)
// -----------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
})
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// Exports app symbol
module.exports = app;
