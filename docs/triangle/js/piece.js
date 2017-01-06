piece = function (val,id,name) {return this.init(val,id,name)};
piece.prototype = {
	init: function(val,id,name){
		var me =  ce('radio', id, val, true);
		me.setAttribute('name', name);
		return me;
		}
}