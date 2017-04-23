/*
 * Jquery Slider
 * http://htmlstack.com/
 *
 * Author, Joe Maddalone
 */

(function ( $ ) {
    $.fn.slideIt = function ( options ) {
        this.settings = $.extend( {
            'width': '250',
            'height': '250',
            'interval': '3000',
            'showNumbers': true,
            'orientation': 'horizontal',
            'auto': true,
            'tooltip': false,
            'animate': true,
            'hover': false
        }, options );
        var that = this;
        that.play = '';
        var _current;
        var _window = this.find( '.slider' );
        var _slider = this.find( '.slides' );
        var _slides = _slider.children( 'li' );
        var _slideWidth = this.settings.width;
        var _slideHeight = this.settings.height;
        var _slideCount = _slides.length;
        var _animate = this.settings.animate;
        var _horizontal = (this.settings.orientation === 'horizontal');
        var _slidesWidth = _horizontal ? _slideWidth * _slideCount : _slideWidth;
        var _slidesHeight = _horizontal ? _slideHeight : _slideHeight * _slideCount;
        var _interval = this.settings.interval;
        var _auto = this.settings.auto;
        var _gutter = 5;
        var _gutters = _gutter * _slideCount;
        var _pager = this.append( $( '<ul/>' ).addClass( 'slide-pager' ) ).find( '.slide-pager' );
        var hidden, visibilityChange;
        if ( typeof document.hidden !== "undefined" ) { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if ( typeof document.mozHidden !== "undefined" ) {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if ( typeof document.msHidden !== "undefined" ) {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if ( typeof document.webkitHidden !== "undefined" ) {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        if ( this.settings.auto ) {
            if ( typeof document.addEventListener === "undefined" || typeof hidden === "undefined" ) {
                //no support for Page Visibility and or AddEventListener
            } else {
                function handleVisibilityChange() {
                    if ( document[ hidden ] ) {
                        clearInterval( that.play );
                    } else {
                        switchSlide()
                    }
                }

                document.addEventListener( visibilityChange, handleVisibilityChange, false );
            }
        }
        if ( this.settings.showNumbers ) {
            $.each( _slides, function ( i, v ) {
                _pager.append( $( '<li/>' ).attr( 'data-id', i + 1 ).html( i + 1 ) );
            } );
        } else {
            $.each( _slides, function ( i, v ) {
                _pager.append( $( '<li/>' ).attr( 'data-id', i + 1 ).html( function () {
                    return ($( v ).attr( 'data-title' ) != 'undefined') ? $( v ).attr( 'data-title' ) : "";
                } ) );
            } );
        }
        var _pagers = _pager.children( 'li' );
        _pagers.css( {
            'cursor': 'pointer'
        } );
        _pagers.first().addClass( "active" );
        if ( !this.settings.hover ) {
            _pagers.click( function () {
                _current = $( this );
                clearInterval( that.play );
                slide();
                if ( _auto ) {
                    clearInterval( that.play );
                    switchSlide();
                }
                return false;
            } );
        } else {
            _pagers.mouseover( function () {
                _current = $( this );
                slide();
                if ( _auto ) {
                    clearInterval( this.play );
                    switchSlide();
                }
                return false;
            } );
        }
        _window.css( {
            'overflow': 'hidden',
            'position': 'relative',
            'width': this.settings.width,
            'height': this.settings.height
        } );
        _slider.css( {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': _slidesWidth,
            'height': _slidesHeight
        } );
        _slides.css( {
            'width': _slideWidth,
            'height': _slideHeight,
            'float': 'left'
        } );

        function slide() {
            var sliderPosition = _horizontal ? (parseInt( _current.attr( "data-id" ) - 1 )) * _slideWidth : (parseInt( _current.attr( "data-id" ) - 1 )) * _slideHeight;
            _pagers.removeClass( 'active' );
            _current.addClass( 'active' );
            if ( _horizontal ) {
                if ( _animate ) {
                    _slider.animate( {
                        left: -sliderPosition
                    } )
                } else {
                    _slider.css( {
                        left: -sliderPosition
                    } )
                }
            } else {
                if ( _animate ) {
                    _slider.animate( {
                        top: -sliderPosition
                    } )
                } else {
                    _slider.css( {
                        top: -sliderPosition
                    } )
                }
            }
        };

        function switchSlide() {
            that.play = setInterval( function () {
                _current = _pager.find( '.active' ).next();
                if ( _current.length === 0 ) {
                    _current = _pagers.first();
                }
                slide();
            }, _interval );
        };
        if ( _auto ) {
            switchSlide();
            _window.hover( function () {
                clearInterval( that.play );
            }, function () {
                switchSlide();
            } );
        }
    };
})( jQuery );
