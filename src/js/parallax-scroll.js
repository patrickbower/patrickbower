/**
* @name parallax scroll
* @author pb
*
*
*
*/

(function ($, pb) {
	'use strict';

	var selectors = {
		parallaxLine : 'parallax-line'
	};

	// constrctor function
	function ParallaxLine(line)
	{
		this.line = line;
		GetPosition.call(this);
		AnimatePosition.call(this);

	};

	function GetPosition()
	{
		var position =  parseInt($(this.line).css('top'))
		this.position = position;
	};

	function AnimatePosition()
	{
		var position = this.position;
		var line = this.line;

		$(window).scroll(function(){
			var scrolled = $(window).scrollTop();
			var parallaxAmount = 0;

			var index = $(line).index();
			switch (index) {
				case index = 0:
					parallaxAmount = 0.25;
					break;
				case index = 1:
					parallaxAmount = 0.75;
					break;
				case index = 2:
					parallaxAmount = 0.25;
					break;
				case index = 3:
					parallaxAmount = 0.5;
					break;
			}

			var	newposition = position + (scrolled * parallaxAmount);
			$(line).css('top', newposition);

		});
	}

	var parallaxLine = $('.' + selectors.parallaxLine);
	parallaxLine.each(function(index){
		var line = this;
		var parallaxLine = new ParallaxLine(line);
	});

	// pb.parallaxScroll = {
	// 	ParallaxLine : ParallaxLine
	// };

}(jQuery, window.pb = window.pb || {}));
