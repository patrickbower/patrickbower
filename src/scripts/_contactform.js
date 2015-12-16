(function ($, pb) {
 	'use strict';

 	var selectors = {
        ContactForm: 'contact'
 	};

    function addEmail(module)
    {
        var first   = "bower.patrick";
        var last    = "gmail.com";

        $(module).find('.direct-link').html(
            '<a class="button button-color--white" href="mailto:' +
                first + '@' + last +'">' + first + '@' + last +
            '<\/a>');
    }

    function init(module)
    {
        addEmail(module);
 	};

    pb.contactform = {
        init: init
    };

 }(jQuery, window.pb = window.pb || {}));
