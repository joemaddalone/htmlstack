function ce( type, ident, inner, isInput ) {
    var el;
    if ( !isInput ) {
        el = document.createElement( type );
        el.innerHTML = inner;
    } else {
        el = document.createElement( 'input' );
        el.value = inner;
        el.type = type
    }
    el.id = ident;
    return el
}
function trace( txt ) {
    //console.log(txt)
}
var _ = function ( selector ) {
    return document.getElementById( selector )
}

var player = function ( v, file, w, h ) {
    this.go = null;
    this.goScrubber = null;
    this.destroy()

    this.w = w;
    this.h = h
    this.vid = new this.video( v, file );
    this.make();
    this.fullscreen = false;
    this.root_bg = 'rgba(0,0,0,0.5)'
    this.root_fg = 'rgb(255,255,255)'

}

player.prototype = {
    video: function ( v, file ) {
        //document.removeChild(_("v"))
        v = ce( "video", "v" );
        //v.setAttribute('controls', 'true');
        v.setAttribute( 'loop', 'true' );
        v.style.display = "none";
        v.innerHTML = '<source src="' + file + '.ogv" type="video/ogg" />';
        v.innerHTML += '<source src="' + file + '.mp4" type="video/mp4" />';
        v.volume = 0.5
        return v
    },
    make: function () {
        this.vol = new this.drawControl( "vol", 5, 20, this.root_bg )
        this.playButton = new this.drawControl( "play", 50, 20, this.root_bg )
        this.vscrub = new this.drawControl( "videoScrubber", 0, 20, this.root_bg )
        //this.fscr = new this.drawControl("fscr", 50, 20,this.root_bg)
        this.fillControl( this.vol )
        this.fillControl( this.playButton )
        this.fillControl( this.vscrub )
        //this.fillControl(this.fscr)
        var container = document.getElementById( 'container' );
        container.appendChild( this.vid );
        _( "v" ).addEventListener( 'loadedmetadata', function ( e ) {
            p.setup();
        }, false );
        var controls = ce( "div", "controls", "" )
        container.appendChild( controls );
        controls.appendChild( this.playButton )
        controls.appendChild( this.vscrub );
        controls.appendChild( this.vol );
        //controls.appendChild(this.fscr);
        this.playButton.addEventListener( 'click', function ( e ) {
            p.play()
        }, false );
    },
    setup: function () {
        /* why does firefox lose these variables?*/
        var container = document.getElementById( 'container' );

        this.c = new this.drawControl( "c", this.w, this.h, "#000000" )
        container.appendChild( this.c );
        this.c.addEventListener( 'click', function ( e ) {
            p.play()
        }, false );
        this.go = setInterval( function () {
            p.drawFrame()
        }, 30 )

        this.scrubberEvent( this.vscrub, "time" )
        this.scrubberEvent( this.vol, "vol" )
        this.resizeVideo()
        p.play()
    },

    scrubberEvent: function ( el, action ) {
        el.addEventListener( 'mousedown', function ( e ) {
            this.isDrag = true;
            p.setScrubber( e, this, action )
        }, false );
        el.addEventListener( 'mousemove', function ( e ) {
            p.setScrubber( e, this, action )
        }, false );
        el.addEventListener( 'mouseup', function ( e ) {
            this.isDrag = false;
            p.setScrubber( e, this, action )
        }, false );
        el.addEventListener( 'mouseout', function () {
            this.isDrag = false
        }, false );

    },


    play: function () {
        if ( this.vid.paused ) {
            this.vid.play();
            this.writeControl( this.playButton, "||" )
            this.goScrubber = setInterval( function () {
                p.drawProgress( p.vscrub )
            }, 100 )
        } else {
            if ( this.vid.ended ) {
                this.vid.currentTime = 0;
                this.vid.play();
                this.writeControl( this.playButton, "||" )
            } else {
                //clearInterval(this.goScrubber)
                this.vid.pause();
                this.writeControl( this.playButton, ">" )
            }
        }
    },
    screen: function () {
        var controller = _( "controls" )

        trace( 'doing screen' )
        trace( this.fullscreen )
        if ( !this.fullscreen ) {
            this.c.width = document.width - 10;
            this.c.height = document.height - 20;
            this.c.style.position = "fixed";
            this.c.style.top = 0;
            this.c.style.left = 0;
            controller.style.position = "fixed";
            controller.style.bottom = 0;
            controller.style.left = 0;
            this.fullscreen = true;
            this.resizeVideo()
        } else {

            controller.style.position = "absolute";
            controller.style.bottom = 0
            controller.style.left = 0
            this.c.width = this.w;
            this.c.height = this.h;
            this.c.style.position = "absolute";
            this.c.style.top = 0;
            this.c.style.left = 0;

            this.fullscreen = false;
            this.resizeVideo()
        }


    },

    resizeVideo: function () {
        var aspect = this.vid.videoHeight / this.vid.videoWidth;
        //original height / original width x new width = new height
        this.arH = aspect * this.c.width
        this.arW = this.vid.videoWidth * (this.arH / this.vid.videoHeight)
        this.vol.width = this.c.width * 0.20
        this.playButton.width = this.c.width * 0.05
        this.vscrub.width = this.c.width * 0.75
        //this.fscr.width = this.c.width * 0.15
        //this.writeControl(this.fscr, "FS")
        this.writeControl( this.playButton, ">" )
        this.fillControl( this.vscrub )
    },


    drawFrame: function () {
        if ( this.c ) {
            this.clearControl( this.c )
            this.fillControl( this.c )

            this.c.ctx.drawImage( _( "v" ), (this.c.width - this.arW) / 2, (this.c.height - this.arH) / 2, this.arW, this.arH );
            //this.drawProgress(this.vscrub)
            this.drawVolume( this.vol )
        }
    },
    drawProgress: function ( control ) {
        if ( control ) {
            this.clearControl( control )
            this.fillControl( control )
            var xpos = control.width * (this.vid.currentTime / this.vid.duration);
            this.drawScrubber( control, xpos )
        }
    },
    drawVolume: function ( control ) {
        this.clearControl( control )
        this.fillControl( control )
        var xpos = control.width * this.vid.volume;
        this.drawScrubber( control, xpos )
    },
    drawScrubber: function ( control, xpos ) {
        if ( control && xpos ) {
            control.ctx.beginPath();
            control.ctx.moveTo( 0, control.height / 2 );
            control.ctx.strokeStyle = "#FFFFFF";
            control.ctx.lineWidth = 1;
            control.ctx.lineTo( xpos, control.height / 2 );
            control.ctx.stroke();
        }
    },
    setScrubber: function ( e, control, func ) {
        if ( control.isDrag ) {
            var ox = e.pageX;
            var barPos = ox - this.findX( control );
            var xPer = (barPos / control.width)
            if ( func != "vol" ) {
                this.vid.currentTime = this.vid.duration * xPer;
            } else {
                this.vid.volume = xPer
            }
        }
    },

    fillControl: function ( control ) {
        if ( control ) {
            control.ctx.fillStyle = control.bg;
            control.ctx.fillRect( 0, 0, control.width, control.height );
        }
    },
    drawControl: function ( ident, w, h, color ) {
        var control = ce( "canvas", ident );
        control.width = w;
        control.height = h;
        if ( !color ) {
            control.bg = 'rgba(0,0,0,0.5)'
        }
        else {
            control.bg = color
        }
        control.ctx = control.getContext( '2d' )
        control.onDrag = false;
        control.style.outline = "1px solid #fff";
        return control
    },
    clearControl: function ( control ) {
        if ( control ) {
            control.ctx.clearRect( 0, 0, control.width, control.height );
            ;
        }
    },
    writeControl: function ( control, txt ) {
        this.clearControl( control )
        this.fillControl( control )
        control.ctx.font = 'bold 10px sans-serif';
        control.ctx.fillStyle = '#FFFFFF';
        control.ctx.fillText( txt, 5, 13 )
    },

    findX: function ( el ) {
        var left = 0;
        if ( el.offsetParent ) {
            do {
                left += el.offsetLeft;
            }
            while ( el = el.offsetParent );
            return left;
        }
    },
    destroy: function () {


        if ( _( "v" ) != null ) {

            _( "v" ).parentNode.removeChild( _( "v" ) );
            _( "vol" ).parentNode.removeChild( _( "vol" ) );
            _( "play" ).parentNode.removeChild( _( "play" ) );
            _( "videoScrubber" ).parentNode.removeChild( _( "videoScrubber" ) );
            //_("fscr").parentNode.removeChild(_("fscr"));
            _( "c" ).parentNode.removeChild( _( "c" ) );
        }
    }


}

