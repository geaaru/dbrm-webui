var express = require('express');
var router = express.Router();

var auth = require('../lib/authentication');
var dbrmUiAuth = auth.DbrmUiAuth();

/* GET users listing. */
router.get('/', dbrmUiAuth.protectedPage,
           function(req, res) {
             res.send('respond with a resource');
});

module.exports = router;
