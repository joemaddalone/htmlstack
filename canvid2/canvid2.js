function makePlayer() {
  var video = document.createElement("video");
  video.id = "player";
  video.setAttribute('loop', 'true');
  video.style.display = "none";
  video.innerHTML += '<source src="../video/bbb.mp4" type="video/mp4" />';
  video.innerHTML += '<source src="../video/bbb.ogv" type="video/ogg" />';
  video.play();
  var container = document.getElementById('container');
  container.appendChild(video);
  var c = document.createElement('canvas');
  c.id = "c";
  container.appendChild(c);
  video.addEventListener('loadedmetadata', function () {
    setInterval(draw, 10);
  }, false);
}

function draw() {
  var video = document.getElementById("player");
  var c = document.getElementById("c");
  var w = video.videoWidth;
  var h = video.videoHeight;
  var segments = 5;
  var gw = Math.floor(w / segments);
  var gh = Math.floor(h / segments); //buffer = 10;

  var buffer = document.getElementById('buffer').value;
  var ctx = c.getContext('2d');
  c.width = w + buffer * segments;
  c.height = h + buffer * segments;

  for (var row = 0; row < segments; row++) {
    //each row
    for (var col = 0; col < segments; col++) {
      //each column
      //context . drawImage(image, dx, dy)
      //context . drawImage(image, dx, dy, dw, dh)
      //context . drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh
      var sx = col * gw;
      var sy = row * gh;
      var sw = gw;
      var sh = gh;
      var dx = col * gw + buffer * col;
      var dy = row * gh + buffer * row;
      var dw = gw;
      var dh = gh;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(dx + 3, dy + 3, dw, dh);
      ctx.drawImage(video, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
}

makePlayer();