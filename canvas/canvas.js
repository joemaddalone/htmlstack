var icount = 0;
var myInterval;
var ctx, canvas;

function scribble() {
  canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    clearInterval(myInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0;
    myInterval = setInterval(makeScribble, 80);
  }
}

function makeScribble() {
  var cw = canvas.width;
  var ch = canvas.height;
  icount += 1;

  if (icount > 10) {
    ctx.clearRect(0, 0, cw, ch);
    icount = 0;
    ctx.beginPath();
    ctx.globalAlpha = 0;
  }

  ctx.globalAlpha += 0.01;
  ctx.beginPath();
  ctx.moveTo(retRandom(cw), retRandom(ch));
  ctx.strokeStyle = random_color();
  ctx.lineWidth = retRandom(10);

  for (var x = 0; x <= retRandom(50); x++) {
    if (retRandom(10) > 5) {
      ctx.quadraticCurveTo(retRandom(cw), retRandom(ch), retRandom(500), retRandom(90));
    } //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    else {
        ctx.lineTo(retRandom(cw), retRandom(ch));
      }

    ctx.stroke();
  }
}

var iCountHeight = 2;
var iCountWidth = 2;
var x = 0;
var y = 0;

function motion() {
  canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    ctx = canvas.getContext('2d'); //x=0;
    //y=0;

    clearInterval(myInterval);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myInterval = setInterval(makemotion, 10);
  }
}

function makemotion() {
  var cw = canvas.width;
  var ch = canvas.height;
  ctx.clearRect(0, 0, cw, ch);
  icount += 1;

  if (iCountHeight + y + 20 > ch || iCountHeight + y < 0) {
    iCountHeight = -iCountHeight;
  }

  if (iCountWidth + x + 20 > cw || iCountWidth + x < 0) {
    iCountWidth = -iCountWidth;
  }

  ctx.fillStyle = "#000";
  x += iCountWidth;
  y += iCountHeight;
  ctx.fillRect(x, y, 20, 20);
}

function motionImg() {
  canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    clearInterval(myInterval);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myInterval = setInterval(makemotionImg, 10);
  }
}

function makemotionImg() {
  var img1 = new Image();
  img1.src = "/staticImages/key.gif";
  var cw = canvas.width;
  var ch = canvas.height;
  ctx.clearRect(0, 0, cw, ch);
  icount += 1;

  if (iCountHeight + y + img1.height > ch || iCountHeight + y < 0) {
    iCountHeight = -iCountHeight;
  }

  if (iCountWidth + x + img1.width > cw || iCountWidth + x < 0) {
    iCountWidth = -iCountWidth;
  }

  ctx.fillStyle = "#000";
  x += iCountWidth;
  y += iCountHeight;
  ctx.drawImage(img1, x, y);
}

function random_color() {
  var rint = Math.round(0xffffff * Math.random());
  return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
}

function retRandom(upper) {
  return Math.floor(Math.random() * upper);
}