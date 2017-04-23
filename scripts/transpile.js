const fs = require( 'fs-extra' );
const glob = require( 'glob' );
const babel = require( "babel-core" );
const processFiles = ( file ) => {
    fs.readFile( file, "utf-8", ( err, js ) => {
        fs.writeFile( file, babel.transform( js, { presets: [ "es2015" ] } ).code, ( err ) => {
            if ( err ) {
                console.log( err )
            }
        } );
    } )
};

glob( './dist/**/*.js', { ignore: './dist/index.js' }, ( err, files ) => {
    files.forEach( processFiles )
} );
