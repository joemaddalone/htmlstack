var icount = 0;
var iCountHeight = 2;
var iCountWidth = 2;
var x = 0;
var y = 0;
function makePlayer() {
    /*

     I am doing it this way because I forsee the
     use of display:none video tags becoming more prevalent in my experiments

     this is  the html structure we are rendering below
     container
     video
     canvas

     */

    var video = document.createElement( "video" );
    video.id = "player";
    video.setAttribute( 'loop', 'true' );
    video.style.display = "none";
    video.innerHTML = '<source src="../video/meischeid.ogv" type="video/ogg" />';
    video.innerHTML += '<source src="../video/meischeid.mp4" />';
    video.play();


    var container = document.getElementById( 'container' );
    container.appendChild( video );


    trace( 'video is now inside container' );


    var c = document.createElement( 'canvas' );
    c.id = "c";
    c.height = "450"
    c.width = "700";
    container.appendChild( c );
    trace( 'canvas created' );

    video.addEventListener( 'loadedmetadata', function () {
        trace( "in loadedmetadata" );
        setInterval( draw, 10 );
    }, false );


}
function trace( txt ) {//console.log(txt)
}

function draw() {
    var video = document.getElementById( "player" );
    var c = document.getElementById( "c" );
    var w = video.videoWidth / 1.5;
    var h = video.videoHeight / 1.5;
    var cw = c.width;
    var ch = c.height;
    var ctx = c.getContext( '2d' );
    if ( iCountHeight + y + h > ch || iCountHeight + y < 0 ) {
        iCountHeight = -iCountHeight
    }
    if ( iCountWidth + x + w > cw || iCountWidth + x < 0 ) {
        iCountWidth = -iCountWidth
    }
    x += iCountWidth;
    y += iCountHeight;
    ctx.clearRect( 0, 0, cw, ch );
    ctx.drawImage( video, x, y, w, h );
    watermark( "c", "htmlstack.com" )
}

function watermark( id, txt ) {
    var canvas = document.getElementById( id );
    var ctx = canvas.getContext( '2d' );

    ctx.font = '90px sans-serif';
    //ctx.fillText(txt, canvas.width-(txt.length*15),canvas.height-30);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillText( txt, 25, 225 )

}


makePlayer();
