/*------------------------------------------------------------------
[Common Scripts]

Project:	Hittasagigget
Version:	1.1
Last change:	07/09/14 [Parallax Function]
-------------------------------------------------------------------*/
/*------------------------------------------------------------------
[Table of contents]

	1. Parallax effect
	2. Placeholders / for IE9 <
  3. Google Maps
  4. Responsive Menu / profile page
  5. Functions calls

-------------------------------------------------------------------*/

//---- 1. Parallax effect ----//
function parallax() {
	var $window = $(window);
	$('section[data-effect="parallax"]').each(function(){
		var $bgobj = $(this);
		$(window).scroll(function() {
			// Remember to define data-speed in html
			var yPos = -($window.scrollTop() / $bgobj.data('speed'));
			// When the section is not on the top of the page
			if ($bgobj.hasClass('secondParallax')) {
				yPos += 400;
			}
			var coords = '50% '+ yPos + 'px';
			// Move the background
			$bgobj.css({ backgroundPosition: coords });
		});
	});
}
//----
//---- 2. Placeholders ------//
(function($) {
  // @todo Document this.
  $.extend($,{ placeholder: {
      browser_supported: function() {
        return this._supported !== undefined ?
          this._supported :
          ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
      },
      shim: function(opts) {
        var config = {
          color: '#888',
          cls: 'placeholder',
          selector: 'input[placeholder], textarea[placeholder]'
        };
        $.extend(config,opts);
        return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
      }
  }});

  $.extend($.fn,{
    _placeholder_shim: function(config) {
      function calcPositionCss(target)
      {
        var op = $(target).offsetParent().offset();
        var ot = $(target).offset();

        return {
          top: ot.top - op.top,
          left: ot.left - op.left,
          width: $(target).width()
        };
      }
      function adjustToResizing(label) {
      	var $target = label.data('target');
      	if(typeof $target !== "undefined") {
          label.css(calcPositionCss($target));
          $(window).one("resize", function () { adjustToResizing(label); });
        }
      }
      return this.each(function() {
        var $this = $(this);

        if( $this.is(':visible') ) {

          if( $this.data('placeholder') ) {
            var $ol = $this.data('placeholder');
            $ol.css(calcPositionCss($this));
            return true;
          }

          var possible_line_height = {};
          if( !$this.is('textarea') && $this.css('height') != 'auto') {
            possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
          }

          var isBorderBox = ($this.css('box-sizing') === 'border-box');
          var isTextarea = $this.is('textarea');

          var ol = $('<label />')
            .text($this.attr('placeholder'))
            .addClass(config.cls)
            .css($.extend({
              position:'absolute',
              display: 'inline',
              'float':'none',
              overflow:'hidden',
              textAlign: 'left',
              color: config.color,
              cursor: 'text',
              paddingTop: !isTextarea && isBorderBox ? '0' : $this.css('padding-top'),
              paddingRight: $this.css('padding-right'),
              paddingBottom: !isTextarea && isBorderBox ? '0' : $this.css('padding-bottom'),
              paddingLeft: $this.css('padding-left'),
              fontSize: $this.css('font-size'),
              fontFamily: $this.css('font-family'),
              fontStyle: $this.css('font-style'),
              fontWeight: $this.css('font-weight'),
              textTransform: $this.css('text-transform'),
              backgroundColor: 'transparent',
              zIndex: 99
            }, possible_line_height))
            .css(calcPositionCss(this))
            .attr('for', this.id)
            .data('target',$this)
            .click(function(){
                if (!$(this).data('target').is(':disabled')) {
                    $(this).data('target').focus();
                }
            })
            .insertBefore(this);
          $this
            .data('placeholder',ol)
						.keydown(function(){
							ol.hide();
						})
						.blur(function() {
              ol[$this.val().length ? 'hide' : 'show']();
            }).triggerHandler('blur');
          $(window).one("resize", function () { adjustToResizing(ol); });
        }
      });
    }
  });
})(jQuery);

jQuery(document).add(window).bind('ready load', function() {
  if (jQuery.placeholder) {
    jQuery.placeholder.shim();
  }
});
//----
//---- 3. Google Maps ----//
if (('#searchPubsPage').length > 0) {
  var map;
          var lat=59.328699;
          var lng=18.061701;
          var zoom=15;
   
          function initialize() {
              var myOptions = {
                  zoom: zoom,
                  center: new google.maps.LatLng(lat, lng),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              map = new google.maps.Map(document.getElementById('myMap'), myOptions);
          }
          google.maps.event.addDomListener(window, 'load', initialize);
}
//----
//---- 4. Responsive Menu ----//
$(document).on('click', '#responsiveMenuBar', function(){
  $(this).next().slideToggle(500);
});
//----
//---- 5. Registration Modal ----//
$(document).on('click', '#mainNavigation .joinUs', function(e){
  e.preventDefault();
  var boostrapModal = '<div class="modal fade" id="registrationModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog">' +
      '<div class="modal-content">' +
        '<div class="modal-header">' +
          '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        '</div>' +
        '<div class="modal-body">' +
          '<p>WHAT ACCOUNT TYPE YOU NEED?</p>' +
          '<div class="choose-icon"></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<a href="" class="btn btn-black">I am loogking for Artist</a>' +
          '<a href="" class="btn btn-action">I am music Artist</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
  $('body').append(boostrapModal);
  $('#registrationModal').modal();
});
//----
//---- 6. Functions calls ----//
$(document).ready(function(){
  parallax();
  //---- plugins triggers
  $('#datetimepicker').datetimepicker({
    language: 'en',
      pickTime: false,
  });
});