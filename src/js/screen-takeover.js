/**
 * @name screen takeover
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

// (function ($, pb) {
// 	'use strict';
//
// 	var settings = {
// 		screenTakeover : '.screen-takeover',
// 		launchBtn : '.screen-takeover__launch',
// 		closeBtn : '.screen-takeover__close'
// 	};
//
// 	function ScreenTakeover() {
//
// 		// add
// 		$(settings.launchBtn).on('click', ScreenTakeover.launch);
// 		// remove
// 		$('body').on('click', settings.closeBtn, ScreenTakeover.remove);
// 	}
//
// 	ScreenTakeover.launch = function(event) {
//
// 		event.preventDefault();
//
// 		var href			= $(this).attr('href').split('#'),
// 			pagePath 		= href[0],
// 			fragmentName 	= href[1];
//
// 		$.ajax({
// 			type: "POST",
// 			url : pagePath,
// 			success: function(data) {
//
// 				var htmlFragment = $(data).filter('.' + fragmentName);
//
// 				$('body')
// 					.prepend(htmlFragment)
// 					.addClass('screen-takeover__active');
// 			}
// 		});
//
// 	};
//
// 	ScreenTakeover.remove = function(event) {
//
// 		event.preventDefault();
//
// 		$(settings.screenTakeover).remove();
//
// 		$('body').removeClass('screen-takeover__active');
// 	};
//
// 	new ScreenTakeover();
//
// }(jQuery, window.pb = window.pb || {}));
