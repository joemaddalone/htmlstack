var gameTimer = function ( cTime ) {
    this.currentTime = parseInt( cTime, 10 )
    this.timerRunning = false
}
gameTimer.prototype = {

    startTimer: function () {
        this.timerRunning = true
        this.timerInterval = setInterval( this.decTimer, 1000 );
    },
    decTimer: function () {
        this.currentTime -= 1
        console.log( this.currentTime.toString() )
        this.checkTimer()
    },
    resetTimer: function () {
        clearInterval( this.timerInterval )
    },
    checkTimer: function () {
        if ( this.currentTime < 0 )
            alert( 'done!' )
    }
}