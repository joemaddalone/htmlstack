// var lvl = 5;
var stopWin = function () {
    var canvas = _( 'canvas' );
    var ctx = canvas.getContext( '2d' );
    clearInterval( window.myInterval );
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    document.body.removeChild( _( 'canvas' ) );
    try {
        _( 'win' ).pause();
        _( 'win' ).currentTime = 0;
        _( 'lose' ).pause();
        _( 'lose' ).currentTime = 0;
    } catch ( err ) {
    }
}

function playAudio( id, vol ) {
    try {
        if ( !vol ) {
            _( id ).volume = 0.25;
        } else {
            _( id ).volume = vol;
        }
        _( id ).currentTime = 0;
        _( id ).play();
    } catch ( e ) {
    }
};

function start( lvl ) {
    var timerInterval;
    _( 'timer' ).style.display = ''
    _( 'lvl' ).innerHTML = 'Level: ' + (lvl - 1).toString();
    _( 'ans' ).innerHTML = '';
    _( 'panel' ).innerHTML = '';
    _( 'results' ).innerHTML = '';
    _( 'results' ).style.display = 'none';
    setClass( 'lvl', 'slideIn' )
    setClass( 'cur', 'slideIn' )
    setClass( 'ans', 'slideIn' )
    setClass( 'getRules', 'slideIn' )

    _( 'cur' ).innerHTML = 'Current Total is: 0';
    var g = new Game( lvl, 9 );
    var ans = g.solution();
    //var gTimer = new gameTimer(lvl*10)
    _( 'ans' ).innerHTML = 'The Answer is:  ' + ans;
    _( 'timer' ).innerHTML = g.currentTime
    decTimer()
    function checkWin() {
        //first check that each row has one selection
        var route = [];
        var sumA = 1;
        var sumChecked = 0;
        for ( i = 0; i < lvl; i++ ) {
            sumA += i;
        }
        var limit = g.pieces.length;
        for ( i = 0; i < limit; i++ ) {
            if ( _( g.pieces[ i ].id ).checked ) {
                sumChecked += 1;
                route.push( g.pieces[ i ].id.split( "-" )[ 1 ] );
            }
        }
        if ( !sumChecked == lvl ) {
            return false;
        }
        var pos = 0;
        var ret = true;
        for ( i = 0; i < route.length; i++ ) {
            if ( parseInt( route[ i ], 10 ) == pos || parseInt( route[ i ], 10 ) == (pos + 1) ) {
                pos = parseInt( route[ i ] );
            } else {
                ret = false;
                break;
            }
        }
        return ret;
    }

    var icon = function ( id, inner ) {
        var nval = 'n';
        switch ( true ) {
            case (lvl < 11):
                nval = 'n';
                break;
            case (lvl < 16):
                nval = 'Bn';
                break;
            default:
                nval = 'Cn';
                break;
        }
        var innerVal = '<div class="val ' + nval + inner + '">&nbsp;</div>';
        var me = ce( 'span', 'icon-' + id, innerVal );
        me.setAttribute( "class", "piece" );
        me.addEvent( 'click', function () {
            _( id ).checked = true;
            playAudio( 'click', 1 );
            tally();
        } )

        return me
    }

    function decTimer() {
        timerInterval = setInterval( function () {
            _( 'timer' ).innerHTML -= 1;
            if ( _( 'timer' ).innerHTML == 0 ) {
                lose()
            }
        }, 1000 );
    }

    function clearBoard() {
        clearInterval( timerInterval );
        _( 'lvl' ).setAttribute( 'class', 'slideOut' );
        _( 'cur' ).setAttribute( 'class', 'slideOut' );
        _( 'ans' ).setAttribute( 'class', 'slideOut' );
        if ( _( 'rules' ).className == 'slideIn' ) {
            setClass( 'rules', 'slideOut' )
        } else {
            setClass( 'getRules', 'slideOut' )
        }
    }

    function lose() {
        clearBoard();
        playAudio( 'lose' );
        g.celebrate( false )
        _( 'results' ).style.display = 'block';
        _( 'results' ).innerHTML = 'You Lost!<br /><sub>Hint: The "Answer" is the highest possible value from the top to the bottom of the pyramid</sub>';
        _( 'results' ).innerHTML += '<br /><button onClick="stopWin();start(lvl)">Retry Level</button>';
    }

    function tally() {
        g.playerTotal = 0;
        g.pieces.forEach( function ( x, idx ) {
            if ( _( x.id ).checked ) {
                g.playerTotal += parseInt( x.value );
                _( 'icon-' + x.id ).setAttribute( "class", "pieceSelected" );
            } else {
                _( 'icon-' + x.id ).setAttribute( "class", "piece" );
            }
        } )
        _( 'cur' ).innerHTML = 'Current Total is: ' + g.playerTotal;
        if ( g.playerTotal == ans && checkWin() ) {
            clearBoard();
            playAudio( 'win' );
            g.celebrate( true )
            _( 'results' ).style.display = 'block';
            _( 'results' ).innerHTML = 'You Won!';
            _( 'results' ).innerHTML += '<br /><button onClick="stopWin();start(lvl+=1)">Next Level</button>';
        } else {
            _( 'results' ).innerHTML = ''
        }
    }

    for ( var i = 0; i < lvl; i++ ) {
        _( 'panel' ).appendChild( ce( "div", 'row-' + i, '' ) )
        _( 'row-' + i ).setAttribute( 'class', 'row' )
    }
    g.pieces.forEach(
        function ( x, idx ) {
            x.addEvent( 'click', tally, false )
            x.style.display = 'none'
            _( 'row-' + x.name ).appendChild( x );
            _( 'row-' + x.name ).appendChild( new icon( x.id, x.value ) )
        } )
}
(function () {
    _( 'hideRules' ).onclick = function () {
        setClass( 'rules', 'slideOut' );
        setClass( 'getRules', 'slideIn' );
    }
    _( 'getRules' ).onclick = function () {
        setClass( 'rules', 'slideIn' );
        setClass( 'getRules', 'slideOut' );
    }
})()