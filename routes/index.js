var express = require('express');
var router = express.Router();

var auth = require('../lib/authentication');
var dbrmUiAuth = auth.DbrmUiAuth();

/* GET home page. */
router.get('/', function(req, res) {

  var render_args = {
    title: global.name,
    version: global.version,
    license: global.license,
  };

  if (dbrmUiAuth.isLoggedIn(req)) {
    render_args.user = req.user;
    res.render('index_authenticated', render_args);
  } else {
    res.render('index', render_args);
  }

});

module.exports = router;
