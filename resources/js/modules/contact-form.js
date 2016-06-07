'use strict';
/**
 * ...
 *
 * @constructor
 * @param {...} ... - ...
 */
var ContactForm = function (module) {

    this.originModule = module;

    // selectors
    this.selector = {
        'contact-form': 'contact'
    }

    this.addInlineEmail();
}

ContactForm.prototype.addInlineEmail = function() {
    console.log('addInlineEmail');
}

// (function ($, pb) {
//  	'use strict';
//
//  	var selectors = {
//         ContactForm: 'contact'
//  	};
//
//     function addEmail(module)
//     {
//         var first   = "bower.patrick";
//         var last    = "gmail.com";
//
//         $(module).find('.direct-link').html(
//             '<a class="button button--white" href="mailto:' +
//                 first + '@' + last +'">' + first + '@' + last +
//             '<\/a>');
//     }
//
//     function hiddenInput(module)
//     {
//         $(module).find('.form__input--confirm').attr('tabindex', '-1');
//     }
//
//     function init(module)
//     {
//         // add direct email (limit spaming bots)
//         addEmail(module);
//
//         // prevent tabbing into hidden input (limit spaming bots)
//         hiddenInput(module)
//  	};
//
//     pb.contactform = {
//         init: init
//     };
//
//  }(jQuery, window.pb = window.pb || {}));
