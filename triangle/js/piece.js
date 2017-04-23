'use strict';

var piece = function piece(val, id, name) {
    return this.init(val, id, name);
};
piece.prototype = {
    init: function init(val, id, name) {
        var me = ce('radio', id, val, true);
        me.setAttribute('name', name);
        return me;
    }
};