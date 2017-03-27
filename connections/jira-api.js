var axios = require("axios");
var btoa = require("btoa");

var axiosInstance = axios.default.create();

var error = {
    valid: true,
    messages: [],
    status: null,
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JiraApi(entrypoint, user, password) {
  _classCallCheck(this, JiraApi);

  this.entrypoint = entrypoint;
  this.username = user;
  this.password = password;
  axiosInstance.defaults.headers.common['Authorization'] = "Basic " + btoa(this.username+":"+this.password);
  axiosInstance.defaults.baseURL = this.entrypoint;

  this.postWorkLog = function(issue, workLogDto) {

    this.issue = issue;
    
    if(!validateConfig(this))
        return new Promise.resolve(error);

    var config = this;

    return axiosInstance.request({
            method: 'post',
            url: 'rest/api/2/issue/' + config.issue + '/worklog',
            data: workLogDto
        })
        .then(function (response) {

            clearError();
            return response.data;
        })
        .catch(function (err) {
            if (err.response){
                error.status = err.response.status;
            }

            error.valid = false;
            error.messages.push(err.message)
            return error;
        });
    }.bind(this);
};

function validateConfig(jiraApi) {

    if(!jiraApi.entrypoint) {
        error.valid = false;
        error.messages.push("Entrypoint Invalid");
    }

    if(!jiraApi.username) {
        error.valid = false;
        error.messages.push("Username Invalid");
    }
    if(!jiraApi.password) {
        error.valid = false;
        error.messages.push("Password Invalid");
    }
    if(!jiraApi.issue) {
        error.valid = false;
        error.messages.push("Issue Invalid");
    }

    return error.valid;
}

function clearError()
{
    error.messages = [],
    error.status = null,
    error.valid = true
}

module.exports = JiraApi