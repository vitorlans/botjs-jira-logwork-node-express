var express = require('express');
var router = express.Router();

var JiraApi = require("../connections/jira-api")
var WorkLog = require("../models/WorkLog");

/* GET home page. */
router.post('/worklog', function(req, res, next) {
  
    var workLogDto = new WorkLog('2017-03-27T03:00:00.000+0000', 12690, 'Teste');
    
    var jiraApi = new JiraApi(process.env.JIRA_HOST, process.env.JIRA_USERNAME, process.env.JIRA_PASSWORD);
    jiraApi.postWorkLog("SMAR-53", workLogDto).then(function(result) {
        res.send(result);
    });

});


module.exports = router;
