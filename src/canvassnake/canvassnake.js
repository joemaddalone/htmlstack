/*!
 * Snake Implemented in Canvas
 *
 * Author: Joe Maddalone
 * Date: November 13 2011
 */
if ( window.HTMLCanvasElement ) {
    /* a reverse forEach */
    Array.prototype._forEach = function ( func ) {
        var len = this.length;
        if ( typeof func != "function" ) throw new TypeError();
        var thisp = arguments[ 1 ];
        for ( var i = len; i > 0; i-- ) {
            if ( i in this ) func.call( thisp, this[ i ], i, this );
        }
    };

    Array.prototype.rnd = function () {
        var i = 0, l = this.length, r = this.length;
        return this[ Math.floor( r * Math.random() - i ) ];
    };

    var page = {
        win: function () {
            return window
        },
        doc: function () {
            return window.document
        },
        id: function ( o ) {
            return window.document.getElementById( o )
        },
        el: function ( type, id ) {
            var ret = window.document.createElement( type );
            ret.setAttribute( 'id', id );
            return ret
        },

    }
    var game = {
        width: 0,
        height: 0,
        mr: function () {
            return Math.random()
        },
        dir: [ 'up', 'down', 'left', 'right' ],
        running: false,
        newCanvas: page.el( 'canvas', 'game' ),
        init: function ( w, h ) {
            this.width = w;
            this.height = h;
            game.newCanvas.setAttribute( 'width', w );
            game.newCanvas.setAttribute( 'height', h );
            page.id( "container" ).appendChild( game.newCanvas );
            return game
        },
        imagesLoaded: false,
        canvas: function () {
            return page.id( "game" )
        },
        ctx: function () {
            return game.canvas().getContext( '2d' )
        },
        blockSize: 10,
        width: 500,
        height: 300,
        items: {
            apple: {
                image: "/staticImages/apple.gif",
                points: 1,
                x: -10,
                y: -10,
                obj: {}
            },
            snake: {
                size: 1,
                x: 150,
                y: 150,
                dir: '',
                image: '/staticImages/snake.gif',
                obj: {},
                body: []
            },
            poster: { image: '/staticImages/poster.gif', x: 0, y: 0, obj: {} }
        },
        player: {
            score: 0
        },
        img: function ( s ) {
            var me = new Image();
            me.src = s;
            return me;
        },
        hit: function ( o1, o2 ) {
            return o1.x == o2.x && o1.y == o2.y
        },
        cannibal: function ( e, i ) {
            return i < game.items.snake.size - 1 && game.items.snake.x == e[ 0 ] && game.items.snake.y == e[ 1 ]
        },
        play: function () {
            if ( !game.imagesLoaded ) {
                game.items.apple.obj = game.img( game.items.apple.image );
                game.items.snake.obj = game.img( game.items.snake.image );
                game.items.poster.obj = game.img( game.items.poster.image );
                game.imagesLoaded = true;
            }

            game.ctx().globalAlpha = 1;
            if ( game.items.snake.size == 1 ) {
                game.player.score = 0
            }
            game.ctx().clearRect( 0, 0, 500, 300 );
            if ( game.items.apple.x == -10 ) {
                game.findplace( game.items.apple );
            }
            switch ( game.items.snake.dir ) {
                case 'left':
                    game.items.snake.x -= game.blockSize;
                    if ( game.items.snake.x < 0 ) {
                        game.items.snake.x = game.canvas().width
                    }
                    break;
                case 'up':
                    game.items.snake.y -= game.blockSize;
                    if ( game.items.snake.y < 0 ) {
                        game.items.snake.y = game.canvas().height
                    }
                    break;
                case 'right':
                    game.items.snake.x += game.blockSize;
                    if ( game.items.snake.x >= game.canvas().width ) {
                        game.items.snake.x = 0
                    }
                    break;
                case 'down':
                    game.items.snake.y += game.blockSize;
                    if ( game.items.snake.y >= game.canvas().height ) {
                        game.items.snake.y = 0
                    }
                    break;
                default:
                    break;
            }
            game.items.snake.body.push( [ game.items.snake.x, game.items.snake.y ] )
            game.items.snake.body._forEach( function ( x, index, arr ) {
                if ( index > game.items.snake.size ) {
                    arr.shift()
                } else {
                    game.ctx().drawImage( game.items.snake.obj, x[ 0 ], x[ 1 ] )
                }
            } )
            if ( game.items.snake.body.some( game.cannibal ) ) {
                game.stop()
            }
            game.ctx().drawImage( game.items.apple.obj, game.items.apple.x, game.items.apple.y )
            if ( game.hit( game.items.snake, game.items.apple ) ) {
                game.clearitem( game.items.apple );
                game.items.snake.size += 1;
                game.player.score += game.items.apple.points
            }
            game.showScore();
        },
        showScore: function () {
            game.ctx().font = '90px sans-serif';
            game.ctx().fillStyle = 'rgba(0, 0, 0, 0.10)';
            game.ctx().fillText( game.player.score, 10, 255 )
        },

        place: function ( o ) {
            game.ctx().drawImage( o.obj, o.x, o.y )
        },
        findplace: function ( o ) {
            o.x = Math.round( (game.mr() * (game.canvas().width - game.blockSize)) / 10 ) * 10;
            ;
            o.y = Math.round( (game.mr() * (game.canvas().height - game.blockSize)) / 10 ) * 10;
        },
        clearboard: function () {
            game.ctx().clearRect( 0, 0, game.canvas().width, game.canvas().height );
        },
        clearitem: function ( o ) {
            game.ctx().clearRect( o.x, o.y, game.blockSize, game.blockSize );
            o.x = -10, o.y = -10
        },
        start: function () {
            window.clearInterval( game._interval );
            game.items.snake.dir = game.dir.rnd()
            game._interval = window.setInterval( function () {
                game.running = true;
                game.play();
                game.showScore()
            }, 60 )
        },
        wait: function () {
            game.clearboard();
            game.place( game.items.poster );
            game.ctx().save()
            game.canvas().addEventListener( 'click', function ( e ) {
                if ( !game.running ) {
                    game.start();
                }


            }, false );

        },
        stop: function () {
            window.clearInterval( game._interval );
            game.running = false;
            game.clearitem( game.items.apple )
            game.clearboard();
            game.place( game.items.poster );
            game.showScore();
            game.items.snake.size = 1;
            game.items.snake.dir = '';
            game.wait()
        }
    }


    document.onkeydown = function ( event ) {

        if ( game.running ) {
            var keyCode;
            if ( event == null ) {
                keyCode = window.event.keyCode;
            } else {
                keyCode = event.keyCode;
            }
            switch ( keyCode ) {
                // left
                case 37:
                    event.preventDefault();
                    if ( game.items.snake.dir != 'right' ) {
                        game.items.snake.dir = 'left'
                    }
                    break;
                // up
                case 38:
                    event.preventDefault();
                    if ( game.items.snake.dir != 'down' ) {
                        game.items.snake.dir = 'up'
                    }
                    break;
                // right
                case 39:
                    event.preventDefault();
                    if ( game.items.snake.dir != 'left' ) {
                        game.items.snake.dir = 'right'
                    }
                    break;
                // down
                case 40:
                    event.preventDefault();
                    if ( game.items.snake.dir != 'up' ) {
                        game.items.snake.dir = 'down'
                    }
                    ;
                    break;
                default:
                    break;
            }
        }
    }
    game.init( 500, 300 ).start()
} else {
    document.getElementById( 'container' ).innerHTML = "<h1>Your browser does not support canvas.</h1>"
}


