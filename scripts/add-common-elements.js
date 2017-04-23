const fs = require( 'fs-extra' );
const glob = require( 'glob' );
const cheerio = require('cheerio');


let back = '', footer = '';


const processFiles = ( file, done ) => {
    fs.readFile( file, "utf-8", ( err, html ) => {
        fs.writeFile( file, insertHTML( html ), ( err ) => {
            if ( err ) {
                console.log( err )
            }
        } );
    } )
};

const insertHTML = ( html ) => {
    let $ = cheerio.load(html)
    $('body').append(footer)
    $('head').append('<link rel="stylesheet" href="/css/site.css">')
    return $.html();
};


//fs.readFile( 'scripts/common-elements/back.html', "utf-8", ( err, f ) => back = f);
fs.readFile( 'scripts/common-elements/footer.html', "utf-8", ( err, f ) => footer = f);

glob( './dist/**/index.html', { ignore: './dist/index.html' }, ( err, files ) => {
    files.forEach( processFiles )
} );
