/**
 * @name parallax scroll
 * @author pb
 *
 * Basic usage:
 *
 * Public function:
 * ParallaxScroll.publicFunction = function() { ... };
 *
 * Private function:
 * var privateFunction = function() { ... };
 *
 */

(function ($, pb) {
	'use strict';

	var settings = {
		OrigPosOne : parseInt($('.line--one').css('top')),
		OrigPosTwo : parseInt($('.line--two').css('top')),
		OrigPosThree : parseInt($('.line--three').css('top')),
		OrigPosFour : parseInt($('.line--four').css('top'))
	};

	function ParallaxScroll() {

		$(window).scroll(function(e){
			ParallaxScroll.calculation();
		});
	}

	ParallaxScroll.calculation = function() {

		var scrolled = $(window).scrollTop(),
			NewPosOne = settings.OrigPosOne + (scrolled * 0.25),
			NewPosTwo = settings.OrigPosTwo - (scrolled * 0.75),
			NewPosThree = settings.OrigPosThree - (scrolled * 0.25),
			NewPosFour = settings.OrigPosFour - (scrolled * 0.5);

		$('.line--one').css('top',(NewPosOne) + 'px');
		$('.line--two').css('top',(NewPosTwo) + 'px');
		$('.line--three').css('top',(NewPosThree) + 'px');
		$('.line--four').css('top',(NewPosFour) + 'px');
	};

	new ParallaxScroll();

}(jQuery, window.pb = window.pb || {}));
