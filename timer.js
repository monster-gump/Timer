"use strict";

var startTime, endTime, pauseTime, timeLength, timeSpan;
var hour, minute, second, ms;
var status;
var isPaused = false, intervalTime = 0;

var start = function() {
  if (isPaused) {
    intervalTime = (intervalTime + parseInt(new Date - pauseTime));
    status = setTimeout(beat, 1);
  }
  else {
    hour = 0;
    minute = 0;
    second = 0;
    startTime = new Date;
    status = setTimeout(beat, 1);
  }

}

var stop = function() {
  clearTimeout(status);
  endTime = new Date;
  timeLength = (endTime - startTime - intervalTime) / 1000;
  alert(timeLength + " seconds flys");
}

var pause = function() {
  pauseTime = new Date;
  isPaused = true;
  clearTimeout(status);
}

var beat = function() {
  endTime = new Date;
  timeSpan = parseInt((endTime - startTime));
  document.getElementById("display").innerHTML = checkTime(timeSpan);
  status = setTimeout(beat, 1);
}

var checkTime = function(ms) {
  ms = ms - second * 1000 - minute * 60000 - hour * 3600000 - intervalTime;
  if (ms >= 1000) {
    second++;
    ms = 0;
  }

  if (second >= 60) {
    minute++;
    second = 0;
  }

  if (minute >= 60) {
    hour++;
    minute = 0;
  }

  if (hour >= 24) {
    hourt = 0;
  }

  return add0(hour) + ":" + add0(minute) + ":" + add0(second) + ":" + add0(parseInt(ms / 10));
}

var add0 = function(arg) {
  return arg >= 10 ? arg : "0" + arg;
}
