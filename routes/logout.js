/*
 * @author  Geaaru, geaaru@gmail.com
 * @version $Id$
 */

var express = require('express');
var router = express.Router();

// -----------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------
router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});
// -----------------------------------------------------------------------


module.exports = router;

// vim: ts=2 sw=2 expandtab
