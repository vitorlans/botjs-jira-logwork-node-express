var axios = require("axios");

var axiosInstance = axios.default.create();
axios.defaults.headers.post['Content-Type'] = 'application/json';


function delayedResponse(responseUrl, responseData) {

    axiosInstance.post(responseUrl, responseData)
    .then(function (response) {
        //console.log(responseData);
    })
    .catch(function (error) {
        //console.log(error);
    });

}

module.exports = delayedResponse;