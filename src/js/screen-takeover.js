/**
 * @name screen takeover
 * @author pb
 *
 *
 *
 */

 (function ($, pb) {
 	'use strict';

 	var selectors = {
        screenTakeover : 'screen-takeover',
		launchBtn : 'screen-takeover__launch',
		closeBtn : 'screen-takeover__close'
 	};

 	function ScreenTakeover(button)
    {
        this.button = button;
        LaunchTakeover.call(this);
        Events(); // as no context in need should I look to make it in case it's of use later on ?
 	};

    function LaunchTakeover()
    {
        var button          = this.button;
        var href			= $(button).attr('href').split('#');
		var	pagePath 		= href[0];
		var	fragmentName 	= href[1];

        $.ajax({
			type: "POST",
			url : pagePath,
			success: function(data) {

				var htmlFragment = $(data).filter('.' + fragmentName);

				$('body')
					.prepend(htmlFragment)
					.addClass('screen-takeover__active');
			}
		});
    };

    function Events()
    {
        var closeBtn = '.' + selectors.closeBtn;
        $('body').on('click', closeBtn, CloseTakeover);
    };

    function CloseTakeover()
    {
        event.preventDefault();
        $('.' + selectors.screenTakeover).remove();
		$('body').removeClass('screen-takeover__active');
    };

    var launchBtn = $('.' + selectors.launchBtn);
 	launchBtn.on('click', function(event){
        event.preventDefault();
        var button = this;
        var screenTakeover = new ScreenTakeover(button);
    });

 	// pb.ScreenTakeover = {
 	// 	ScreenTakeover : ScreenTakeover
 	// };

 }(jQuery, window.pb = window.pb || {}));
