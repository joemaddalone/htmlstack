const fs = require( 'fs-extra' );
const glob = require( 'glob' );
const cheerio = require('cheerio');


let back = '', footer = '';


const processFiles = ( file, done ) => {
    fs.readFile( file, "utf-8", ( err, html ) => {
        fs.writeFile( file, insertHTML( html, file ), ( err ) => {
            if ( err ) {
                console.log( err )
            }
        } );
    } )
};

const insertHTML = ( html, file ) => {
    let $ = cheerio.load(html);
    let currentFooter = footer.replace('@@@', `https://github.com/joemaddalone/htmlstack/tree/master/src/${file.split('/')[2]}`)
    $('body').append(currentFooter);
    $('head').append('<link rel="stylesheet" href="/css/site.css">');
    return $.html();
};

fs.readFile( 'scripts/common-elements/footer.html', "utf-8", ( err, f ) => footer = f);

glob( './dist/**/index.html', { ignore: './dist/index.html' }, ( err, files ) => {
    files.forEach( processFiles )
} );