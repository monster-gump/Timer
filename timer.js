"use strict";

var startTime, endTime, timeLength, timeSpan;
var hour, minute, second, ms;
var status;

var start = function() {
  hour = 0;
  minute = 0;
  second = 0;
  startTime = new Date;
  status = setTimeout(beat, 1000);
}

var stop = function() {
  clearTimeout(status);
  endTime = new Date;
  timeLength = parseInt((endTime - startTime) / 1000);
  alert(timeLength);
}

var beat = function() {
  endTime = new Date;
  timeSpan = parseInt((endTime - startTime) / 1000);
  document.getElementById("display").innerHTML = checkTime(timeSpan);
  status = setTimeout(beat, 1000);
}

var checkTime = function(len) {
  len = len - minute * 60;
  if (len >= 60) {
    minute++;
    len = 0;
  }

  minute = minute - hour * 60;
  if (minute >= 60) {
    hour++;
    minute = 0;
  }

  return add0(hour) + ":" + add0(minute) + ":" + add0(len);
}

var add0 = function(arg) {
  return arg >= 10 ? arg : "0" + arg;
}
