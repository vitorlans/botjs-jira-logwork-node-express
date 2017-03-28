var express = require('express');
var router = express.Router();

var JiraApi = require("../connections/jira-api")
var SlackHook = require("../connections/slack-hook");
var WorkLog = require("../models/WorkLog");


var dto = {
    username:"",
    password:"",
    issue:"",
    date:"",
    hour:"",
    minute:"",
    comment:""
}

// {
//    "token":"gIkuvaNzQIHg97ATvDxqgjtO",
//    "team_id":"T0001",
//    "team_domain":"example",
//    "channel_id":"C2147483705",
//    "channel_name":"test",
//    "user_id":"U2147483697",
//    "user_name":"Steve",
//    "command":"/worklog",
//    "text":"username senha issue 28/03/2017 4h 0m Desenvolvimento Web App",
//    "response_url":"https://hooks.slack.com/commands/1234/5678"
// }

/* GET home page. */
router.post('/worklog', function(req, res, next) {
    
    var body = req.body;
    var instructions =  body.text.split(" ");

    dto.username = instructions[0];
    dto.password = instructions[1];
    dto.issue = instructions[2];
    dto.date = instructions[3];
    dto.hour = instructions[4];
    dto.minute = instructions[5];
    dto.comment = instructions.slice(6).join(" ")

    var timespent = Number.parseInt(dto.hour.toLowerCase().replace("h","")) * 3600;
    timespent += Number.parseInt(dto.minute.toLowerCase().replace("m", "")) * 60;

    var date = dto.date.split('/').reverse().join('-');
    date = date + 'T03:00:00.000+0000'

    var workLogDto = new WorkLog(date, timespent, dto.comment);

    var jiraApi = new JiraApi(process.env.JIRA_HOST, dto.username, dto.password);
    jiraApi.postWorkLog(dto.issue, workLogDto).then(function(result) {
        
        var message = "Your WorkLog was logged with success on \n"
                    + process.env.JIRA_HOST + "\n"
                    + "User: " + dto.username + "\n"
                    + "Comments: " + result.comment + "\n" 
                    + "Date: " + result.started + "\n"
                    + "Time: " + result.timeSpent

        var response = {
            response_type: 'ephemeral',
            text: message
        }
        SlackHook(body.response_url, response);

    });
    
    res.json({
        response_type: 'ephemeral',
        text: 'received your command'
    })
});


module.exports = router;
