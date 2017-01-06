var game = function (b, u) {
	this.base=b;
	this.pieces  = [];
    this.upper = u;
    this.playerTotal = 0;
    this.dat = new Array(b);
	this.currentTime = b*5;
	this.timerRunning = false;
    this.init(b, u);

}
game.prototype = {
    init: function (b, u) {
        for (var row = 0; row < this.base; row++) {
            this.dat[row] = new Array(this.base);
            for (var col = 0; col < this.base; col++) {
                this.dat[row][col] = 0;
            }
            for (var col = 0; col <= row; col++) {
                this.dat[row][col] = this.retRnd(this.upper);
				var x = new this.piece(this.dat[row][col],row + '-' +  col,row);
				this.pieces.push(x);
            }
        }
    },
    retRnd: function (x) {
		//return 5
        var ret = Math.floor(Math.random() * (x + 1));
        if (ret == 0) {
            return 1
        } else {
            return ret
        }
    },
    solve: function (t) {
        t._forEach(
        function (copyRowVal, copyRow, arr) {
            copyRowVal.forEach(
            function (copyColVal, copyCol, arr2) {
                if (t[copyRow][copyCol] > t[copyRow][copyCol + 1]) {
                    t[copyRow - 1][copyCol] += t[copyRow][copyCol]
                } else {
                    t[copyRow - 1][copyCol] += t[copyRow][copyCol + 1]
                }
            })
        })
        return t[0][0]
    },
    solution: function () {
        this.copy = this.dat.clone();
        return this.solve(this.copy);
    },
	piece: function(val,id,name){
		var me =  ce('radio', id, val, true);
		me.setAttribute('name', name);
		return me;
	},
	celebrate: function(isWin) {

		var col = -15;
		var y=0;
		var gridSize=15
		var canvas = ce("canvas", "canvas");	
		document.body.appendChild(canvas);
		if (canvas.getContext){
			ctx = canvas.getContext('2d');
			this.gridSize = 15;
			myInterval = setInterval(make,15);
		}
	
		function make(){
			var canvas = _("canvas");	
			if(col>=canvas.width){col=0;y+=gridSize} else {col+=gridSize};
			if (y>=canvas.height){ctx.clearRect(0,0, canvas.width, canvas.height);y=0};
			if(isWin){
				ctx.fillStyle = random_color();}
				else{ctx.fillStyle = 'rgb(0,0,0)';}
			ctx.fillRect(col,y , gridSize, gridSize);
		}
	
		function random_color(){
			var rint = Math.round(0xffffff * Math.random());
			return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
		}  
	}	
}