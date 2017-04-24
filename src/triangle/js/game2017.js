/* Welcome to the source!
 * Author, Joe Maddalone, November 2008
 * Minor rewrite in 2017, but mostly left untouched.
 */


(function () {
    Array.prototype._forEach = function ( fun ) {
        var len = this.length;
        if ( typeof fun != "function" ) throw new TypeError();
        var thisp = arguments[ 1 ];
        for ( var i = len; i > 0; i-- ) {
            if ( i in this ) fun.call( thisp, this[ i ], i, this );
        }
    };


    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function ( fun /*, thisp */ ) {
            if ( this === void 0 || this === null )
                throw new TypeError();

            var t = Object( this );
            var len = t.length >>> 0;
            if ( typeof fun !== "function" )
                throw new TypeError();

            var thisp = arguments[ 1 ];
            for ( var i = 0; i < len; i++ ) {
                if ( i in t )
                    fun.call( thisp, t[ i ], i, t );
            }
        };
    }

    Object.prototype.addEvent = function ( eventName, eventHandler ) {
        if ( this.addEventListener ) {
            this.addEventListener( eventName, eventHandler, false );
        } else if ( this.attachEvent ) {
            this.attachEvent( 'on' + eventName, eventHandler );
        }
    };


    /* because array.slice wont copy objects */
    Object.prototype.clone = function () {
        var newObj = (this instanceof Array) ? [] : {};
        for ( var i in this ) {
            if ( i == 'clone' ) {
                continue
            }
            if ( this[ i ] && typeof this[ i ] == "object" ) {
                newObj[ i ] = this[ i ].clone();
            } else {
                newObj[ i ] = this[ i ]
            }
        }
        return newObj;
    };

    window._ = function ( selector ) {
        return document.getElementById( selector )
    };
    window.ce = function ( type, ident, inner, isInput ) {
        var el;
        if ( !isInput ) {
            el = document.createElement( type );
            el.innerHTML = inner;
        } else {
            el = document.createElement( 'input' );
            el.setAttribute( 'type', type );
            el.setAttribute( 'value', inner );
        }
        el.id = ident;
        return el;
    };

    window.setClass = function ( el, cssClass ) {
        el.setAttribute( 'class', cssClass )
    };

})();


var game = function ( lvl ) {
    this.lvl = lvl + 1;
    this.upper = 9;
    this.els = {
        timer: _( 'timer' ),
        lvl: _( 'lvl' ),
        ans: _( 'ans' ),
        panel: _( 'panel' ),
        results: _( 'results' ),
        cur: _( 'cur' ),
        rules: _( 'rules' ),
        getRules: _( 'getRules' ),
        hideRules: _('hideRules')
    }

    var hr = this.els.hideRules;
    var gr = this.els.getRules;
    var r = this.els.rules

    hr.addEvent('click', function(){
        setClass(r, 'slideOut');
        setClass(gr, 'slideIn')
    });

    gr.addEvent('click', function(){
        setClass(gr, 'slideOut');
        setClass(r, 'slideIn')
    });
}

game.prototype = {
    start(){
        /**
         * if game is already in progress - clear out the end level canvas and timer
         */
        if ( _( 'canvas' ) ) {
            document.body.removeChild( _( 'canvas' ) );
            clearInterval( this.endLevelInterval )
        }
        this.els.timer.style.display = '';
        this.els.lvl.textContent = 'Level: ' + this.lvl.toString();
        this.els.ans.textContent = '';
        this.els.panel.textContent = '';
        this.els.results.textContent = '';
        this.els.results.style.display = 'none';
        this.els.cur.textContent = 'Current Total is: 0';
        setClass(this.els.lvl, 'slideIn');
        setClass(this.els.cur, 'slideIn');
        setClass(this.els.ans, 'slideIn');
        setClass(this.els.getRules, 'slideIn');
        this.pieces = [];
        this.buildPieces();
        this.setPieces();
        this.ans = this.solution();

        this.els.ans.textContent = 'The Answer is:  ' + this.ans;


        this.els.timer.textContent = this.lvl * 5;
        this.decTimer()
    },
    buildPieces: function () {
        this.dat = new Array( this.lvl );
        for ( var row = 0; row < this.lvl; row++ ) {
            this.dat[ row ] = new Array();
            for ( var col = 0; col < this.base; col++ ) {
                this.dat[ row ][ col ] = 0
            }

            for ( var col = 0; col <= row; col++ ) {
                this.dat[ row ][ col ] = this.rnd( this.upper );
                var x = this.piece( this.dat[ row ][ col ], row + '-' + col, row );
                this.pieces.push( x )
            }
        }
    },
    setPieces: function () {
        var self = this;
        for ( var i = 0; i < self.lvl; i++ ) {
            /**
             * present each row
             */
            _( 'panel' ).appendChild( ce( "div", 'row-' + i, '' ) );
            _( 'row-' + i ).setAttribute( 'class', 'row' )
        }
        self.pieces.forEach( function ( x, idx ) {
            /**
             * present each piece
             */
            x.style.display = 'none';
            _( 'row-' + x.name ).appendChild( x );
            _( 'row-' + x.name ).appendChild( self.icon( x.id, x.value ) )
        } )
    },
    solve: function ( t ) {
        /*
         solves the highest possible value w/o needed to brute force each possible path
         */
        t._forEach( function ( copyRowVal, copyRow ) {
            copyRowVal.forEach( function ( copyColVal, copyCol ) {
                if ( t[ copyRow ][ copyCol ] > t[ copyRow ][ copyCol + 1 ] ) {
                    t[ copyRow - 1 ][ copyCol ] += t[ copyRow ][ copyCol ]
                } else {
                    t[ copyRow - 1 ][ copyCol ] += t[ copyRow ][ copyCol + 1 ]
                }
            } )
        } );
        return t[ 0 ][ 0 ]
    },
    solution: function () {
        /*
         calls the solve function with a copy of the dat array and returns the solve value
         */
        return this.solve( this.dat.clone() )
    },
    icon: function ( id, inner ) {
        /*
         generates the piece presentation
         */
        var self = this;
        var nval = 'n';
        switch ( true ) {
            case (self.lvl < 11):
                nval = 'n';	// big
                break;
            case (self.lvl < 16):
                nval = 'Bn'; // medium
                break;
            default:
                nval = 'Cn'; // small
                break
        }
        var innerVal = '<div class="val ' + nval + inner + '">&nbsp;</div>';
        var me = ce( 'span', 'icon-' + id, innerVal );
        me.setAttribute( "class", "piece" );
        me.addEvent( 'click', function () {
            _( id ).checked = true;
            self.playAudio( 'click', 1 );
            self.tally()
        } );
        return me
    },
    tally: function () {
        /*
         calculates current score and checks for win
         */
        var self = this;
        var r = self.els.results;
        self.playerTotal = 0;
        self.pieces.forEach( function ( x, idx ) {
            if ( _( x.id ).checked ) {
                self.playerTotal += parseInt( x.value );
                _( 'icon-' + x.id ).setAttribute( "class", "pieceSelected" )
            } else {
                _( 'icon-' + x.id ).setAttribute( "class", "piece" )
            }
        } );
        self.els.cur.textContent = 'Current Total is: ' + self.playerTotal;
        if ( self.playerTotal == self.ans && self.checkWin() ) {
            self.playAudio( 'win' );
            self.clearBoard();
            self.endLevel( true );
            r.style.display = 'block';
            r.innerHTML = 'You Won!<br />';
            var btn = ce( 'button' );
            btn.textContent = 'Next Level';
            self.lvl++;
            btn.addEvent( 'click', self.start.bind( self ) );
            r.appendChild( btn )

        }
        else {
            r.innerHTMl = ''
        }
    },
    checkWin: function () {
        /*
         validates that each selecction is adjacent
         */
        var route = [];
        var sumA = 1;
        var sumChecked = 0;
        for ( var i = 0; i < lvl; i++ ) {
            sumA += i
        }
        ;
        var limit = this.pieces.length;
        for ( var i = 0; i < limit; i++ ) {
            if ( _( this.pieces[ i ].id ).checked ) {
                sumChecked += 1;
                route.push( this.pieces[ i ].id.split( "-" )[ 1 ] )
            }
        }
        ;
        if ( !sumChecked == lvl ) {
            return false
        }
        ;
        var pos = 0;
        var ret = true;
        for ( i = 0; i < route.length; i++ ) {
            if ( parseInt( route[ i ], 10 ) == pos || parseInt( route[ i ], 10 ) == (pos + 1) ) {
                pos = parseInt( route[ i ] )
            } else {
                ret = false;
                break
            }
        }
        return ret
    },
    clearBoard: function () {
        clearInterval( this.timerInterval );
        this.els.lvl.setAttribute( 'class', 'slideOut' );
        this.els.cur.setAttribute( 'class', 'slideOut' );
        this.els.ans.setAttribute( 'class', 'slideOut' );
        if ( this.els.rules.className == 'slideIn' ) {
            setClass( this.els.rules, 'slideOut' )
        } else {
            setClass( this.els.getRules, 'slideOut' )
        }
    },
    endLevel: function ( isWin ) {
        /*
         generates a canvas and does either the colored grid or the black grid depending on isWin
         */
        var col = -15;
        var y = 0;
        var gridSize = 15;
        var canvas = ce( "canvas", "canvas" );
        document.body.appendChild( canvas );
        if ( canvas.getContext ) {
            var ctx = canvas.getContext( '2d' );
            this.endLevelInterval = setInterval( make, 15 )
        }
        ;

        function make() {
            var canvas = _( "canvas" );
            if ( col >= canvas.width ) {
                col = 0;
                y += gridSize
            } else {
                col += gridSize
            }
            if ( y >= canvas.height ) {
                ctx.clearRect( 0, 0, canvas.width, canvas.height );
                y = 0
            }
            if ( isWin ) {
                ctx.fillStyle = random_color()
            } else {
                ctx.fillStyle = 'rgb(0,0,0)'
            }
            ctx.fillRect( col, y, gridSize, gridSize )
        };

        function random_color() {
            var rint = Math.round( 0xffffff * Math.random() );
            return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')'
        }
    },
    playAudio: function ( id, vol ) {
        /*
         plays the audio element passed in
         */
        try {
            if ( !vol ) {
                _( id ).volume = 0.25
            } else {
                _( id ).volume = vol
            }
            _( id ).currentTime = 0;
            _( id ).play()
        } catch ( e ) {
        }
    },
    decTimer: function () {
        /*
         start the timer
         */
        var self = this;
        var timer = self.els.timer
        this.timerInterval = setInterval( function () {
            timer.textContent -= 1;
            if ( +timer.textContent == 0 ) {
                self.lose()
            }
        }, 1000 )
    },
    lose: function () {
        /*
         Calls lose screen
         Retry Level
         */
        var self = this;
        self.clearBoard();
        self.playAudio( 'lose' );
        self.endLevel( false )
        var r = self.els.results;
        r.style.display = 'block';
        r.innerHTML = 'You Lost!<br /><sub>Hint: The "Answer" is the highest possible value from the top to the bottom of the pyramid</sub><br />';

        var btn = ce( 'button' );
        btn.textContent = 'Retry Level';
        btn.addEvent( 'click', self.start.bind( self ) );
        r.appendChild( btn )
    },
    rnd: function ( x ) {
        var ret = Math.floor( Math.random() * (x + 1) );
        return ret === 0 ? 1 : ret;
    },
    piece: function ( val, id, name ) {
        /*
         generates a piece which is really a radio button
         */
        var me = ce( 'radio', id, val, true );
        me.setAttribute( 'name', name );
        return me
    }
}
