const fs = require( 'fs-extra' )

fs.copy( './src', './dist', err => {
    if ( err ) return console.error( err )
    console.log( "files copied" )
} );
