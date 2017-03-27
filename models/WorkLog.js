"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkLog = function WorkLog(started, timeSpentSeconds, comment) {
  _classCallCheck(this, WorkLog);

    this.started = started;
    this.timeSpentSeconds = timeSpentSeconds;
    this.comment = comment;
};

module.exports = WorkLog;