(function ($, pb) {
 	'use strict';

 	var selectors = {
        ContactForm: 'contact'
 	};

    function contactForm()
    {
        console.log('contact form is ready to go');
    }

    function init(module)
    {
        // console.log('contactform', context);
        contactForm();
 	};

    pb.contactform = {
        init: init
    };

 }(jQuery, window.pb = window.pb || {}));
