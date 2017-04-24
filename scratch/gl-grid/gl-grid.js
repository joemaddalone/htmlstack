let gl;
let shaderProgram;
let vertices;
let vertexCount = 6000;
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener( 'mousemove', e => {
    mouseX = map( e.clientX, 0, canvas.width, -1, 1 );
    mouseY = map( e.clientY, 0, canvas.height, 1, -1 );
} );

function map( value, minSrc, maxSrc, minDst, maxDst ) {
    return (value - minSrc) / (maxSrc - minSrc) * (maxDst - minDst) + minDst;
}

const initGL = () => {
    let canvas = document.querySelector( 'canvas' );
    gl = canvas.getContext( 'webgl' );
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1, 1, 1, 1 );
};


const draw = () => {
    for ( var i = 0; i < vertexCount * 2; i += 2 ) {
        let dx = vertices[ i ] - mouseX;
        let dy = vertices[ i + 1 ] - mouseY;
        let dist = Math.sqrt( dx * dx + dy * dy );
        if ( dist < 0.2 ) {
            vertices[ i ] = mouseX + dx / dist * 0.2;
            vertices[ i + 1 ] = mouseY + dy / dist * 0.2;
        }
        else {
            vertices[ i ] += Math.random() * 0.02 - 0.01;
            vertices[ i + 1 ] += Math.random() * 0.02 - 0.01;
        }

    }
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.bufferSubData( gl.ARRAY_BUFFER, 0, new Float32Array( vertices ) );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, vertexCount )

    requestAnimationFrame( draw )
};

const createShaders = () => {
    let vs = `attribute vec4 coords;
    attribute float pointSize;
    void main(void) {
    gl_Position = coords;
    gl_PointSize= pointSize;
    }`;

    let vertexShader = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( vertexShader, vs );
    gl.compileShader( vertexShader );

    let fs = `precision mediump float;
    uniform vec4 color;
    void main(void) {
    gl_FragColor = color;
    }`;


    let fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( fragmentShader, fs );
    gl.compileShader( fragmentShader );

    shaderProgram = gl.createProgram();
    gl.attachShader( shaderProgram, vertexShader );
    gl.attachShader( shaderProgram, fragmentShader );
    gl.linkProgram( shaderProgram );
    gl.useProgram( shaderProgram );


};

const createVertices = () => {
    vertices = [];
    for ( var i = 0; i < vertexCount; i++ ) {
        vertices.push( Math.random() * 2 - 1 );
        vertices.push( Math.random() * 2 - 1 );
    }

    let buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.DYNAMIC_DRAW );


    let coords = gl.getAttribLocation( shaderProgram, "coords" );
    //gl.vertexAttrib3f(coords, 0.5,-0.5,0);
    gl.vertexAttribPointer( coords, 2, gl.FLOAT, false, 0, 0 )
    gl.enableVertexAttribArray( coords )
    //gl.bindBuffer(gl.ARRAY_BUFFER, null)

    let pointSize = gl.getAttribLocation( shaderProgram, "pointSize" );
    gl.vertexAttrib1f( pointSize, 2 );

    let color = gl.getUniformLocation( shaderProgram, "color" );
    gl.uniform4f( color, 0, 0, 0, 1 );
};

initGL();
createShaders();
createVertices();
draw();

