/*------------------------------------------------------------------
[Common Scripts]

Project:	Hittasagigget
Version:	1.1
Last change:	07/09/14 [Parallax Function]
-------------------------------------------------------------------*/
/*------------------------------------------------------------------
[Table of contents]

	1. Parallax effect
	2. Functions calls

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
//---- 2. Functions calls ----//
$(document).ready(function(){
	parallax();
	//---- plugins triggers
	$('#datetimepicker').datetimepicker({
		language: 'en',
    	pickTime: false,
	});
});