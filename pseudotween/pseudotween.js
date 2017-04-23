"use strict";

/* Welcome to the source!
 * HTML5 Really verbose pesuedo-tweening
 * http://htmlstack.com/
 *
 * Author, Joe Maddalone
 */

var _ = function _(selector) {
    return document.getElementById(selector);
};

/* uck, here come a bunch of global vars*/
var movieH = 500;
var movieW = 500;
var movieXC = movieW / 2;
var movieYC = movieH / 2;
var boxH = 100;
var boxW = 300;
var new_boxH = 100;
var new_boxW = 300;
var boxX = movieXC - boxW / 2;
var boxY = movieYC - boxH / 2;
var me = _('canvas').getContext("2d");
var steps = 10;

function animate() {
    /* my steps var should really be a FPS value */
    if (boxH < new_boxH) {
        boxH += new_boxH / steps;
    }
    if (boxH > new_boxH) {
        boxH -= new_boxH / steps;
    }
    if (boxW < new_boxW) {
        boxW += new_boxW / steps;
    }
    if (boxW > new_boxW) {
        boxW -= new_boxW / steps;
    }
    /*
     the structure above works, but will always do height before width.
     true tweening would require pushing everything into an
     array and then executing those adjustments
     */
    var boxX = movieXC - boxW / 2;
    var boxY = movieYC - boxH / 2;
    me.clearRect(0, 0, 500, 500);
    DrawBox(me, 0, 0, 500, 500, "#fff", "#fff");
    DrawBox(me, boxX, boxY, boxW, boxH, "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)");
    DrawBox(me, boxX + 1, boxY + 1, boxW - 2, boxH - 2, "#fff", "#000");
    DrawBox(me, boxX + 4, boxY + 4, boxW - 8, boxH - 8, "#A24B30", "#000");
}

function DrawBox(ctx, sx, sy, dx, dy, fc, sc) {
    ctx.fillStyle = fc;
    ctx.fillRect(sx, sy, dx, dy);
}

setInterval(function () {
    animate(me, boxX, boxY, boxW, boxH);
}, 30);