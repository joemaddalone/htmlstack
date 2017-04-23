/*
 * HTML5 Canvas Maze Game
 * http://htmlstack.com/
 *
 * Author, Joe Maddalone
 */

var mazeGame = function () {
}
mazeGame.prototype = {
    start: function () {
        this.canvas = document.getElementById( 'canvas' );
        this.startY = 380;
        this.startX = 0;
        this.currentX = 0;
        this.currentY = 380;
        this.cwidth = 400;
        this.cheight = 400;
        this.player = new Image();
        this.player.src = "/staticImages/key.gif";
        this.ctx = this.canvas.getContext( '2d' );
        this.blockSize = 20;
        this.make( this.currentX, this.currentY );
    },
    make: function ( currentX, currentY ) {
        this.ctx.clearRect( 0, 0, this.cwidth, this.cheight );
        var row = 1;
        var x = 0;
        var i = 0;
        for ( i = 0; i < maze.length; i++ ) {
            if ( maze.charAt( i ) == "@" ) {
                row += this.blockSize;
                x = 0;
                i += 1
            }
            this.ctx.fillStyle = this.retColor( maze.charAt( i ) );
            this.ctx.fillRect( x * this.blockSize, row, this.blockSize, this.blockSize );
            x += 1
        }
        this.setPlayer( this.currentX, this.currentY );
    },
    oops: function ( x, y ) {
        this.ctx.clearRect( 0, 0, this.cwidth, this.cheight );
        var row = 1;
        var x = 0;
        for ( var i = 0; i < err.length; i++ ) {
            if ( err.charAt( i ) == "@" ) {
                row += this.blockSize;
                x = 0;
                i += 1
            }
            this.ctx.fillStyle = this.retColor( err.charAt( i ) );
            this.ctx.fillRect( x * this.blockSize, row, this.blockSize, this.blockSize );
            x += 1;
        }
        this.setPlayer( this.startX, this.startY );
    },
    setPlayer: function ( x, y ) {
        if ( maze.split( "@" )[ y / this.blockSize ].charAt( x / this.blockSize ) == "1" ) {
            this.currentY = this.startY;
            this.currentX = this.startX;
            this.setPlayer( this.startX, this.startY );
            alert( "You Win!" );
        }
        if ( maze.split( "@" )[ y / this.blockSize ].charAt( x / this.blockSize ) == " " ) {
            if ( x > this.cwidth - this.blockSize ) {
                x = this.cwidth - this.blockSize;
                this.currentX = x
            }
            if ( y > this.cheight - this.blockSize ) {
                y = this.cheight - this.blockSize;
                this.currentY = y
            }
            if ( x < 0 ) {
                x = 0;
                this.currentX = x
            }
            if ( y < 0 ) {
                y = 0;
                this.currentY = y
            }
            this.ctx.drawImage( this.player, x, y, this.blockSize, this.blockSize );
        }
        if ( maze.split( "@" )[ y / this.blockSize ].charAt( x / this.blockSize ) == "2" ) {
            this.currentY = this.startY;
            this.currentX = this.startX;
            this.oops( this.currentX, this.currentY )
        }
    },
    retColor: function ( n ) {
        switch ( n ) {
            case "1":
                return "#ff0";
                break;
            case "2":
                return "#000";
                break;
            case "3":
                return "#f00";
                break;
            default:
                return "#fff";
        }
    }
}

document.onkeydown = function ( event ) {
    var keyCode;
    if ( event == null ) {
        keyCode = window.event.keyCode;
    }
    else {
        keyCode = event.keyCode;
    }
    switch ( keyCode ) {
        // left
        case 37:
            m.currentX -= m.blockSize;
            m.make( m.currentX, m.currentY );
            break;
        // up
        case 38:
            m.currentY -= m.blockSize;
            m.make( m.currentX, m.currentY );
            break;
        // right
        case 39:
            m.currentX += m.blockSize;
            m.make( m.currentX, m.currentY );
            break;
        // down
        case 40:
            m.currentY += m.blockSize;
            m.make( m.currentX, m.currentY );
            break;
        default:
            break;
    }
}


var m

function load() {
    m = new mazeGame()
    m.start()
    //document.onkeydown = m.onkeydown()
}


var maze = "22212222222222222222@"
maze += "2 2 2222222222222222@";
maze += "2 2 2222222222222222@";
maze += "2 2           222222@";
maze += "2 22222222222 222222@";
maze += "2          22  22222@";
maze += "2 22222222 222     2@";
maze += "2 2222222222222222 2@";
maze += "2 222222           2@";
maze += "2  22222 22222222222@";
maze += "22 22222 2       2 2@";
maze += "22 22222 2 22222 2 2@";
maze += "22       2 22    2 2@";
maze += "22222222 2222 22 2 2@";
maze += "22222222      22 2 2@";
maze += "2222222222222222 2 2@";
maze += "2222             2 2@";
maze += "2222 222222 222222 2@";
maze += "2222 222222        2@";
maze += "     222222222222222@";

var err = "333333333333333333333@"
err += "333   3   3   3   333@";
err += "333 3 3 3 3 3 3 33333@";
err += "333   3   3   3   333@";
err += "333   3   3   333 333@";
err += "33333333333 333   333@";
err += "33333333333 333333333@";
err += "33333333333 333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "333333333333333333333@";
err += "    33333333333333333@";


load();
