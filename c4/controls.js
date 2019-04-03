/*
 protoype dynamic HTML5 video player
 author: Joe Maddalone
 date: 03/26/2010
 NOTES:
 1. I decided not to use any other framework (i.e. jQuery, prototype, etc)
 because the overhead is just not needed

 2. at this time the page actually reloads on video selection,
 however when I get around to it I'll add a clear function
 <scratch that - I removed the playlist for now>

 3. the video scrubber and volume scrubber are so similar that I
 need to make a universal scrubber function for them both

 5. video/volume scrubbers have a global length bug

 6. while in fullscreen Esc key will also return to original size

 7. clicking on the player itself will pause/play

 This code is FREE and a bit of a mess.  Do with it whatever you like and if you make it better send it back my way
 http://www.twitter.com/joemaddalone

 */
var unscrubbedColor = "#fff";
var scrubbedColor = "#f00";
var scrubberColor = "#000";
var fullscreen = false;
var vctx;
var vpos;

function makePlayer(videoID, src) {
  /*
   this is  the html structure we are rendering below
     container
   video
   play/pause button
   scubber canvas
   current time
   duration
   volume canvas
   */
  var player = document.getElementById(videoID);
  player.innerHTML = '<source src="../video/' + src + '.ogv" type="video/ogg" />';
  player.innerHTML += '<source src="../video/' + src + '.mp4" />';
  trace('video element= ' + videoID);

  if (!document.getElementById('container')) {
    var container = document.createElement('div');
    container.id = "container";
    container.style.position = 'relative';
    player.parentNode.insertBefore(container, player);
    player.parentNode.removeChild(player);
    container.appendChild(player);
  }

  trace('video is now inside container');
  var controller = document.createElement('div');
  controller.id = "controls";
  player.parentNode.appendChild(controller);
  trace('controller created');
  var playpause = document.createElement('span');
  playpause.id = "playpause";
  controller.appendChild(playpause);
  playpause.innerHTML = '<button class="play"></button>';
  trace('play/pause created');
  var scrubber = document.createElement('canvas');
  scrubber.id = "scrubber";
  controller.appendChild(scrubber);
  trace('scrubber canvas created');
  var display = document.createElement('span');
  display.id = "display";
  controller.appendChild(display);
  display.innerHTML = '0:00:00&nbsp;/&nbsp;';
  var duration = document.createElement('span');
  duration.id = "duration";
  controller.appendChild(duration);
  duration.innerHTML = '--:--:--';
  trace('timers created');
  var vol = document.createElement('canvas');
  vol.id = "volume";
  controller.appendChild(vol);
  trace('volume canvas created');
  var fscr = document.createElement('span');
  fscr.id = "fscr";
  controller.appendChild(fscr);
  fscr.innerHTML = '<button class="fs"></button>';
  trace('play/pause created');
  loadvideo();
}

function loadvideo() {
  trace("loading video");
  var player = document.getElementById('player');
  var controller = document.getElementById('controls');
  var playbutton = document.getElementById('playpause');
  var container = document.getElementById('container');
  var scrubber = document.getElementById('scrubber');
  var vol = document.getElementById('volume');
  var fscr = document.getElementById('fscr');
  var volVal = 0.5;
  player.volume = volVal;
  document.getElementById('display').addEventListener('ondragstart', function (e) {
    return false;
  }, false);
  player.addEventListener('loadedmetadata', function () {
    scrubber.width = player.videoWidth * 0.4 + 8; //vol.width = player.videoWidth*0.05;

    scrubber.height = 24;
    vol.width = 50;
    vol.height = 24;
    document.getElementById('controls').style.width = player.videoWidth - 3 + "px";
    document.getElementById('duration').innerHTML = fixtime(player.duration);
    trace("in loadedmetadata");
  }, false);
  player.addEventListener('timeupdate', function (e) {
    document.getElementById('display').innerHTML = fixtime(player.currentTime) + "&nbsp;/&nbsp;";
  }, false);
  /* start */

  player.addEventListener('play', function (e) {
    playbutton.innerHTML = '<button class="pause"></button>';
  }, false);
  /* paused */

  player.addEventListener('pause', function (e) {
    playbutton.innerHTML = '<button class="play"></button>';
  }, false);
  /* end */

  player.addEventListener('ended', function (e) {
    playbutton.innerHTML = '<button class="pause"></button>';
    player.play();
  }, false);
  /* fullscreen clicked */

  fscr.addEventListener('click', function () {
    screen(fullscreen);
  }, false);
  /* playbutton clicked */

  playbutton.addEventListener('click', function () {
    if (player.paused) {
      player.play();
    } else {
      if (player.ended) {
        player.currentTime = 0;
        player.innerHTML = '<div class="pause"></div>';
        player.play();
      } else {
        player.pause();
      }
    }
  }, false);
  player.addEventListener('click', function () {
    if (player.paused) {
      player.play();
    } else {
      if (player.ended) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, false);
  drawScrubber();
  drawVolScrubber();
  /*Scrubber Stuffs*/

  var stopper = 0;

  function drawScrubber() {
    if (scrubber.getContext) {
      scrubber.addEventListener("mousedown", function (e) {
        //player.pause();
        stopper = 0;
        setScrubber(e);
        scrubber.addEventListener("mousemove", function (e) {
          setScrubber(e);
        }, false);
      }, false);
      scrubber.addEventListener("mouseup", function (e) {
        stopper = 1; //player.play()
      }, false); //canvas.addEventListener("mouseout",function(e) {stopper=1;player.play()},false);

      var ctx = scrubber.getContext('2d');
      scrubbedColor = ctx.createLinearGradient(0, 0, 0, 16);
      scrubbedColor.addColorStop(0, '#FF0000');
      scrubbedColor.addColorStop(1, '#660000');
      scrubberColor = ctx.createLinearGradient(0, 0, 0, 16);
      scrubberColor.addColorStop(0, '#000000');
      scrubberColor.addColorStop(0.5, '#222222');
      scrubberColor.addColorStop(1, '#444444');
      unscrubbedColor = ctx.createLinearGradient(0, 0, 0, 16);
      unscrubbedColor.addColorStop(0, '#FFFFFF');
      unscrubbedColor.addColorStop(1, '#666666');
      setInterval(makeScrubber, 25);
    }
  }

  function setScrubber(e) {
    if (stopper == 0) {
      var ox = e.pageX; //x pos on the page itself

      var barPos = ox - findX(scrubber); //x position relative to canvas
      //determine percentage of x across the canvas

      var xPer = barPos / scrubber.width;
      player.currentTime = player.duration * xPer;
    }
  }

  function makeScrubber() {
    var xpos;
    xpos = scrubber.width * (player.currentTime / player.duration);

    if (isNaN(xpos)) {
      xpos = 0;
    }

    ;
    var ctx = scrubber.getContext('2d'); //		trace("xpos = " + xpos);
    //drawing scrubber before current position

    for (var i = 0; i <= xpos; i += 8) {
      ctx.fillStyle = scrubbedColor;
      ctx.fillRect(i, 8, 8, 8);
    } //current position


    ctx.fillStyle = scrubberColor;
    ctx.fillRect(xpos, 8, 8, 8); //after current position

    for (var i = xpos + 8; i <= scrubber.width; i += 8) {
      ctx.fillStyle = unscrubbedColor;
      ctx.fillRect(i, 8, 8, 8);
    }
  }
  /* Volume Scrubber */


  var vstopper = 0;

  function drawVolScrubber() {
    volVal = player.volume;

    if (vol.getContext) {
      vol.addEventListener("mousedown", function (e) {
        vstopper = 0; //alert(player.volume);

        setVolScrubber(e);
        vol.addEventListener("mousemove", function (e) {
          setVolScrubber(e);
        }, false);
      }, false);
      vol.addEventListener("mouseup", function (e) {
        vstopper = 1;
      }, false);
      vctx = vol.getContext('2d');
      scrubbedColor = vctx.createLinearGradient(0, 0, 0, 16);
      scrubbedColor.addColorStop(0, '#FF0000');
      scrubbedColor.addColorStop(1, '#660000');
      scrubberColor = vctx.createLinearGradient(0, 0, 0, 16);
      scrubberColor.addColorStop(0, '#000000');
      scrubberColor.addColorStop(0.5, '#222222');
      scrubberColor.addColorStop(1, '#444444');
      unscrubbedColor = vctx.createLinearGradient(0, 0, 0, 16);
      unscrubbedColor.addColorStop(0, '#FFFFFF');
      unscrubbedColor.addColorStop(1, '#666666');
      setInterval(makeVolScrubber, 25);
    }
  }

  function makeVolScrubber() {
    vpos = vol.width * volVal; //drawing scrubber before current position

    for (var i = 0; i <= vpos; i += 8) {
      vctx.fillStyle = scrubbedColor;
      vctx.fillRect(i, 8, 8, 8);
    } //current position


    vctx.fillStyle = scrubberColor;
    vctx.fillRect(vpos, 8, 8, 8); //after current position

    for (var i = vpos + 8; i <= vol.width; i += 8) {
      vctx.fillStyle = unscrubbedColor;
      vctx.fillRect(i, 8, 8, 8);
    }
  }

  function setVolScrubber(e) {
    if (vstopper == 0) {
      var vx = e.pageX; //x pos on the page itself

      var vbarPos = vx - findX(vol); //x position relative to canvas
      //determine percentage of x across the canvas

      var vxPer = vbarPos / vol.width;
      player.volume = 1 * vxPer;
      volVal = 1 * vxPer;
      trace('volume = ' + player.volume);
    }
  }
}

function findX(el) {
  var left = 0;

  if (el.offsetParent) {
    do {
      left += el.offsetLeft;
    } while (el = el.offsetParent);

    return left;
  }
}

function screen() {
  var controller = document.getElementById('controls');
  var player = document.getElementById('player');

  if (!fullscreen) {
    player.width = document.width - 10;
    player.height = document.height - 60;
    player.style.position = "fixed";
    player.style.top = 0;
    player.style.left = 0;
    controller.style.position = "fixed";
    controller.style.bottom = 0;
    controller.style.left = 0;
    fullscreen = true;
    controller.style.width = player.width + "px";
  } else {
    player.width = player.videoWidth;
    player.height = player.videoHeight;
    fullscreen = false;
    controller.style.width = player.videoWidth - 3 + "px";
    controller.style.position = "absolute";
    controller.style.bottom = "5px";
    controller.style.left = "0px";
    player.style.position = "relative";
    player.style.top = 0;
    player.style.left = 0;
  }
}

function fixtime(t) {
  var s = t;
  var h = Math.floor(s / 3600);
  s = s % 3600;
  var m = Math.floor(s / 60);
  s = Math.floor(s % 60);
  if (s.toString().length < 2) s = "0" + s;
  if (m.toString().length < 2) m = "0" + m;
  return h + ":" + m + ":" + s;
}

function trace(txt) {
  console.log(txt);
}

document.onkeydown = function (event) {
  var keyCode;

  if (event == null) {
    keyCode = window.event.keyCode;
  } else {
    keyCode = event.keyCode;
  }

  if (fullscreen) {
    if (keyCode == 27) {
      screen(fullscreen);
    }
  }
};

makePlayer('player', 'meischeid');