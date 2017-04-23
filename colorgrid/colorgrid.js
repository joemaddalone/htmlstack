'use strict';

(function () {
    var col = -50,
        y = 0,
        gridSize = void 0,
        ctx = void 0,
        canvas = void 0;

    var make = function make() {
        if (col >= canvas.width) {
            col = 0;
            y += gridSize;
        } else {
            col += gridSize;
        }
        if (y >= canvas.height) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            y = 0;
        }
        ctx.fillStyle = random_color();
        ctx.fillRect(col, y, gridSize, gridSize);
    };

    var random_color = function random_color() {
        var rint = Math.round(0xffffff * Math.random());
        return 'rgb(' + (rint >> 16) + ', ' + (rint >> 8 & 255) + ', ' + (rint & 255) + ')';
    };

    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        gridSize = 50;
        setInterval(make, 25);
    }
})();