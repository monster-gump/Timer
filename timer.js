"use strict";

var startTime, endTime, pauseTime, timeLength, timeSpan;
var hour, minute, second, ms;
var status;
var isStopped = true, isPaused = false, intervalTime = 0;
var countDownMinute, countDownTime;

var init = function() {
  hour = 0;
  minute = 0;
  second = 0;
  ms = 0;
  intervalTime = 0;
  isStopped = false;
  isPaused = false;
}

var start = function() {
  if (isStopped) {
    init();
    startTime = new Date;
    status = setTimeout(beat, 10);
  }
  else if (isPaused) {
    isPaused = false;
    isStopped = false;
    intervalTime = (intervalTime + parseInt(new Date - pauseTime));
    status = setTimeout(beat, 10);
  }
}

var stop = function() {
  if (isStopped || isPaused) {
    isStopped = true;
    clearTimeout(status);
    document.getElementById("display").innerHTML = "00:00:00:00";
    return;
  }
  clearTimeout(status);
  endTime = new Date;
  timeLength = (endTime - startTime - intervalTime) / 1000;
  isStopped = true;
  console.log(timeLength + "seconds passed");
}

var pause = function() {
  if (isPaused) {
    return;
  }
  pauseTime = new Date;
  isPaused = true;
  clearTimeout(status);
}

var beat = function() {
  endTime = new Date;
  timeSpan = parseInt((endTime - startTime)  - intervalTime);
  document.getElementById("display").innerHTML = checkTime(timeSpan);
  status = setTimeout(beat, 10);
}

var checkTime = function(ms) {
  ms = ms - second * 1000 - minute * 60000 - hour * 3600000;
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

var countDown = function() {
  init();
  countDownMinute = parseInt(document.getElementById("count-down-time").value);
  document.getElementById("count-down-time").value = "";
  startTime = new Date;
  countDownMinute *= 60000;
  status = setTimeout(beatCountDown, 10);
}

var beatCountDown = function() {
  endTime = new Date;
  timeSpan = parseInt(endTime - startTime);
  document.getElementById("display").innerHTML = checkCountDownTime(timeSpan);
  status = setTimeout(beatCountDown, 10);
}

var checkCountDownTime = function(timeSpan) {
  countDownTime = countDownMinute - timeSpan;
  if (countDownTime <= 0 ) {
    clearTimeout(status);
    return "00:00:00:00";
  }
  minute = parseInt(countDownTime / 60000);
  second = parseInt(countDownTime % 60000);
  ms = parseInt(second % 1000);
  second = parseInt(second / 1000);

  return add0(hour) + ":" + add0(minute) + ":" + add0(second) + ":" + add0(parseInt(ms / 10));
}
