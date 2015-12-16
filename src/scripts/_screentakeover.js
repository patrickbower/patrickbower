(function ($, pb) {
 	'use strict';

    var selectors = {
        screenTakeover: 'screen-takeover',
        launchBtn: 'js-screen-takeover__launch',
        closeBtn: 'js-screen-takeover__close'
    };

    function ScreenTakeover(properties)
    {
        this.button = properties.button;
        launch.call(this);
        events();
    	};

    function launch()
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

                window.init($('.' + fragmentName));
    		}
    	});
    };

    function events()
    {
        var closeBtn = '.' + selectors.closeBtn;
        $('body').on('click', closeBtn, close);
    };

    function close()
    {
        event.preventDefault();
        $('.' + selectors.screenTakeover).remove();
    	$('body').removeClass('screen-takeover__active');
    };

    function init(module)
    {
    	$('.' + selectors.launchBtn, context).on('click', function(event){
            event.preventDefault();
            var button = this;
            var screenTakeover = new ScreenTakeover({
                button: button
            });
        });
    };

    pb.screentakeover = {
        init: init
    };

}(jQuery, window.pb = window.pb || {}));
