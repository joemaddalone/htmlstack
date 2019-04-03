const fs = require( 'fs-extra' );
const glob = require( 'glob' );
const babel = require( "@babel/core" );
const processFiles = ( file ) => {
    fs.readFile( file, "utf-8", ( err, js ) => {
        fs.writeFile( file, babel.transform( js, {
            "plugins": [
                "@babel/plugin-proposal-function-bind",
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-logical-assignment-operators",
                [
                    "@babel/plugin-proposal-optional-chaining",
                    {
                        "loose": false
                    }
                ],
                [
                    "@babel/plugin-proposal-pipeline-operator",
                    {
                        "proposal": "minimal"
                    }
                ],
                [
                    "@babel/plugin-proposal-nullish-coalescing-operator",
                    {
                        "loose": false
                    }
                ],
                "@babel/plugin-proposal-do-expressions",
                [
                    "@babel/plugin-proposal-decorators",
                    {
                        "legacy": true
                    }
                ],
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-throw-expressions",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-syntax-import-meta",
                [
                    "@babel/plugin-proposal-class-properties",
                    {
                        "loose": true
                    }
                ],
                "@babel/plugin-proposal-json-strings",
                [
                    "@babel/transform-runtime",
                    {
                        "helpers": false,
                        "regenerator": true
                    }
                ]
            ]
        } ).code, ( err ) => {
            if ( err ) {
                console.log( err )
            }
        } );
    } )
};

glob( './dist/**/*.js', { ignore: './dist/index.js' }, ( err, files ) => {
    files.forEach( processFiles )
} );
