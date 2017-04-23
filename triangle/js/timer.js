'use strict';

var gameTimer = function gameTimer(cTime) {
    this.currentTime = parseInt(cTime, 10);
    this.timerRunning = false;
};
gameTimer.prototype = {

    startTimer: function startTimer() {
        this.timerRunning = true;
        this.timerInterval = setInterval(this.decTimer, 1000);
    },
    decTimer: function decTimer() {
        this.currentTime -= 1;
        console.log(this.currentTime.toString());
        this.checkTimer();
    },
    resetTimer: function resetTimer() {
        clearInterval(this.timerInterval);
    },
    checkTimer: function checkTimer() {
        if (this.currentTime < 0) alert('done!');
    }
};