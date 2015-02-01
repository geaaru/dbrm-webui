/**
 * Module for handle user authentication
 * @author  Geaaru, geaaru@gmail.com
 * @id      $Id$
 */

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , session = require('express-session')
  , express = require('express')
  , flash = require('connect-flash');

function DbrmUiAuth (app) {

  this.app = app;

  this._init(app);

}

DbrmUiAuth.prototype = {

  _init: function (app) {

    console.log('Created DbrmUiAuth!');

    // Initialize express session and passport
    app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      name: 'dbrmui_cookie'
    })); // TODO: secret MUST BE READ FROM A CONFIG FILE

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

  },

  authenticate: function() {

    return passport.authenticate('local', {
      successRedirect: '/login/success',
      failureRedirect: '/login/failure',
      failureFlash: true
    });

  },

  loginSuccess: function(req, res) {

    res.json({
      success: true,
      user: req.session.passport.user
    });

  },

  loginFailure: function(req, res, err) {
    res.json({
      success: false,
      message: typeof err != 'undefined' ? err : req.flash('loginMessage')
    });

  },

  isLoggedIn: function(req) {
    return req.isAuthenticated();
  },

  protectedPage: function(req, res, next) {

    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }

  },

}

function Authentication () {

  this.auth = undefined;

}

Authentication.prototype = {


  DbrmUiAuth: function (app) {

    if (this.auth == undefined) {
      this.auth = new DbrmUiAuth(app);
      console.log('Authentication object created');
    }

    return this.auth;

  },

  _auth: function(req, username, password, done) {

    var user = new Object();
    user.username = 'geaaru';
    user.id = 1;

    console.log("Received request for user " + username +
                " and pwd " + password);

    if (username === user.username) {

      return done(null, user);

    } else {

      return done(null, false, req.flash('loginMessage',
                                         'Invalid username or password'));

    }

  },

  _serializeUser: function(user, done) {
    done(null, user.id);
    console.log("Serialize ...");
  },

  _deserializeUser: function(id, done) {

    console.log("Deserialize ... " + id);
    var user = new Object();
    user.username = 'geaaru';
    user.id = 1;

    if (id == user.id) {
      done(null, user);
    } else {
      done('Invalid user', null);
    }

  },

}


var auth = new Authentication();

// Configure passport
passport.use(new LocalStrategy({
  // allows us to pass back the entire request to the callback
  passReqToCallback : true
}, auth._auth));
passport.serializeUser(auth._serializeUser);
passport.deserializeUser(auth._deserializeUser);

module.exports = auth;

// vim: ts=2 sw=2 expandtab
