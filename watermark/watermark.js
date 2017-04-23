'use strict';

(function () {
    var watermark = function watermark(id, imgsrc, txt) {
        var canvas = document.getElementById(id);
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.src = imgsrc;
            img.onload = function () {
                var imgWidth = img.width;
                var imgHeight = img.height;
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.font = '30px sans-serif';
                ctx.fillText(txt, canvas.width - txt.length * 15, canvas.height - 30);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.fillText(txt, canvas.width - txt.length * 15 - 2, canvas.height - 32);
            };
        }
    };
    watermark('canvas', '/staticImages/y.jpg', 'htmlstack.com');
})();