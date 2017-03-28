var axios = require("axios");

var axiosInstance = axios.default.create();

function delayedResponse(responseUrl, responseData) {

    axiosInstance.post(responseUrl, responseData);

}

module.exports = delayedResponse