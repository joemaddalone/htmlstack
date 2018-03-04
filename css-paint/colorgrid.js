'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorGridPainter = function () {
	function ColorGridPainter() {
		_classCallCheck(this, ColorGridPainter);
	}

	_createClass(ColorGridPainter, [{
		key: 'paint',
		value: function paint(ctx, geom, properties) {
			var random_color = function random_color() {
				var rint = Math.round(0xffffff * Math.random());
				return 'rgb(' + (rint >> 16) + ', ' + (rint >> 8 & 255) + ', ' + (rint & 255) + ')';
			};
			var size = 50;
			for (var y = 0; y < geom.height / size; y++) {
				for (var x = 0; x < geom.width / size; x++) {
					ctx.beginPath();
					ctx.fillStyle = random_color();
					ctx.rect(x * size, y * size, size, size);
					ctx.fill();
				}
			}
		}
	}]);

	return ColorGridPainter;
}();

registerPaint('colorgrid', ColorGridPainter);