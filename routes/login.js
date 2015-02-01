/*
 * @author  Geaaru, geaaru@gmail.com
 * @version $Id$
 */

var express = require('express');
var router = express.Router();

var auth = require('../lib/authentication');
var dbrmUiAuth = auth.DbrmUiAuth();

var render_args = {
  title: global.name,
  version: global.version,
  license: global.license
};

// -----------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------
router.get('/', function(req, res) {
  if (dbrmUiAuth.isLoggedIn(req)) {
    res.redirect('/');
  } else {
    res.render('login', render_args);
  }
});

router.get('/success', function(req, res) {
  if (dbrmUiAuth.isLoggedIn(req)) {
    dbrmUiAuth.loginSuccess(req, res);
  } else {
    dbrmUiAuth.loginFailure(req, res, 'Invalid request');
  }
});

router.get('/failure', function(req, res) {
  if (dbrmUiAuth.isLoggedIn(req)) {
    res.redirect('/logout');
  } else {
    dbrmUiAuth.loginFailure(req, res, undefined);
  }
});
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// POST
// -----------------------------------------------------------------------
router.post('/', dbrmUiAuth.authenticate());

// -----------------------------------------------------------------------

module.exports = router;

// vim: ts=2 sw=2 expandtab
