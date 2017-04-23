function celebrate() {
    var col = -15;
    var y = 0;
    var canvas = ce( "canvas", "canvas" );
    document.body.appendChild( canvas );
    if ( canvas.getContext ) {
        ctx = canvas.getContext( '2d' );
        this.gridSize = 15;
        myInterval = setInterval( make, 15 );
    }

    function make() {
        var canvas = _( "canvas" );
        if ( col >= canvas.width ) {
            col = 0;
            y += gridSize
        } else {
            col += gridSize
        }
        ;
        if ( y >= canvas.height ) {
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            y = 0
        }
        ;
        ctx.fillStyle = random_color();
        ctx.fillRect( col, y, gridSize, gridSize );
    }

    function random_color() {
        var rint = Math.round( 0xffffff * Math.random() );
        return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
    }

}



