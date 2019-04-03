function ce(type, ident, inner, isInput) {
  var el;

  if (!isInput) {
    el = document.createElement(type);
    el.innerHTML = inner;
  } else {
    el = document.createElement('input');
    el.value = inner;
    el.type = type;
  }

  el.id = ident;
  return el;
}

var _ = function (selector) {
  return document.getElementById(selector);
};

function checkbox() {
  var dataImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAAA3NCSVQICAjb4U/gAAABHVBMVEX///9ltFpZpVBSnUr4YWNIkUE/hDg4fDL/dXjyS07/dXj9bXD6a234YWP4XWD2WVv2VFfsOTzoLzHmKSvkISNpul5ouF32VFf0TE/vREfuPD7iHB5ltFpeq1RWoU1SnUr2WVtIkEA/hDjvREdSnUpWoU1SnUr0TE9ltFpltFqM1oSMz4CKz36FzHuBynaEyHmAyXV9yHN4v2x1vGr/holstGL/gYVpr19orl7/fYD/e31jq1r/dXhgpldfpVb/cXNZpVD9bXBYn1D/a236a21SnUr/Zmb4YWP4XWD/Wl32WVtIkED/VVj2VFf3VFb0TE8/hDjyS072SUs8gjY7gDXvREc4fDLuQELuPD7sOTzrMzXoLzHnLC/mKSvkISMrJIqrAAAAX3RSTlMAERERERERESIiMzMzMzMzMzMzMzNEREREREREZnd3d3d3d3eImZmq3e7//////////////////////////////////////////////////////////////////////7W/hfEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMjEvMTCej/OTAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M1cbXjNgAAAQJJREFUKJHNyldTwkAUBeBr771X7C0NS4Rs1myiKxsjiIIYxPL/f4YhMcNdw4wzPnle7plzP4B/nf6u634ubcOjyZ3cWurmzOL2t6N0LHaCH45k3IGpGM5O4iyLjUfO58TfzbiCol49Jp2RC8InYtfoiIX12BVV1amnG6eXTPicSu74bKPtNM157qzCswihAXKLR4bibu7ZmoEdQEDuygw56LHPT4yCqevuC3ZTAS1HcAZNva6pavn89Q8nGPNuHpqzaOy7tfVT2U1HLghfq6Vqaw7NA/duxnmVEKDVKNXe59FjsC45WK6ItgP4CGtva/gzBHJWnppJ+ZRdNqtp+cX9NV89BSxHIHexlgAAAABJRU5ErkJggg==";
  var me = {
    init: function (stage, width, height, label, selected) {
      me.label = label;
      me.width = width;
      me.height = height;
      me.stage = stage;
      me.stage.setAttribute('width', width);
      me.stage.setAttribute('height', height);
      me.ctx = me.stage.getContext('2d');
      me.stage.addEventListener("click", function () {
        me.toggle();
      }, false);
      me.selected = !selected;
      me.img = new Image();
      me.img.src = dataImage;

      me.img.onload = function () {
        me.toggle();
      };

      return me;
    },
    fill: function (fillcolor) {
      me.ctx.fillStyle = fillcolor;
      me.ctx.fillRect(0, 0, me.width, me.height);
    },
    draw: function (sx, sy) {
      me.clear();

      if (me.label) {
        if (me.selected) {
          me.write(me.label, "red");
        } else {
          me.write(me.label, "green");
        }
      }

      me.ctx.drawImage(me.img, sx, sy, 20, 20, 0, 0, 20, 20);
    },
    write: function (txt, labelcolor) {
      me.ctx.font = '12px sans-serif';
      me.ctx.fillStyle = labelcolor;
      me.ctx.fillText(txt, 25, 14);
    },
    clear: function () {
      me.ctx.clearRect(0, 0, me.width, me.height);
    },
    on: function () {
      me.clear();
      me.draw(0, 0);
    },
    off: function () {
      me.clear();
      me.draw(20, 0);
    },
    toggle: function () {
      if (!me.selected) {
        me.on();
        me.selected = true;
      } else {
        me.off();
        me.selected = false;
      }

      ;
      me.stage.selected = me.selected;
    },
    click: function (func) {
      me.stage.addEventListener('click', func, false);
    }
  };
  return me;
}

;

for (var i = 0; i < 5; i++) {
  var me = 'check-' + i;

  _('panel').appendChild(ce("canvas", me));

  var o = new checkbox().init(_(me), 200, 20, "this is checkbox #" + i, true).click(function () {
    _('results').innerHTML = 'Logged: ' + this.id + ' was set to ' + this.selected + ' at ' + new Date();
  });
}