function init() {
    setInterval( draw, 10 );
}
function draw() {
    var canvas = document.getElementById( 'canvas' );
    var blockSize = 25;
    var ch = canvas.height;
    var cw = canvas.width;
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var mseconds = currentTime.getMilliseconds();
    if ( hours > 12 ) {
        hours = hours - 12
    }
    if ( hours < 10 ) {
        hours = '0' + hours
    }
    if ( minutes < 10 ) {
        minutes = "0" + minutes
    }
    if ( seconds < 10 ) {
        seconds = "0" + seconds
    }
    if ( mseconds < 10 ) {
        mseconds = "0" + mseconds
    }
    if ( mseconds < 100 ) {
        mseconds = "0" + mseconds
    }
    var txt = hours + ':' + minutes + ':' + seconds;

    if ( canvas.getContext ) {
        var ctx = canvas.getContext( '2d' );
        ctx.clearRect( 0, 0, cw, ch );
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.arc( cw / 2, ch / 2, (360 / 1000) * mseconds, 0, 360, false );
        ctx.fill();
        ctx.beginPath();
        ctx.arc( cw / 2, ch / 2, (360 / 60) * seconds, 0, 360, false );
        ctx.fill();
        ctx.beginPath();
        ctx.arc( cw / 2, ch / 2, (360 / 60) * minutes, 0, 360, false );
        ctx.fill();
        ctx.beginPath();
        ctx.arc( cw / 2, ch / 2, (360 / 12) * hours, 0, 360, false );
        ctx.fill();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect( blockSize * 4, ch, blockSize, (ch * -1) * (hours / 12) );
        ctx.fillRect( blockSize * 6, ch, blockSize, (ch * -1) * (minutes / 60) );
        ctx.fillRect( blockSize * 8, ch, blockSize, (ch * -1) * (seconds / 60) );
        ctx.fillRect( blockSize * 11, ch, blockSize, (ch * -1) * (mseconds / 1000) );
        ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
        ctx.fillRect( blockSize * 22, 0, blockSize, (ch) * (hours / 12) );
        ctx.fillRect( blockSize * 19, 0, blockSize, (ch) * (minutes / 60) );
        ctx.fillRect( blockSize * 16, 0, blockSize, (ch) * (seconds / 60) );
        ctx.fillRect( blockSize * 13, 0, blockSize, (ch) * (mseconds / 1000) );
        ctx.font = '85px sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillText( txt, 160, (canvas.height / 2) + 5 );
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillText( txt, 160, canvas.height / 2 );
    }
}


init();
