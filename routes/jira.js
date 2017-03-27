var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/logwork', function(req, res, next) {
  
    //
    res.send("JIRA");

});

module.exports = router;
