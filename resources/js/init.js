'use strict';

/**
* Initalize requiried JS from data attribures found in page HTML.
*
* @constructor
* @param {object} window - Global object referance.
* @param {object} document - Document object referance.
* @param {object} undefined - Ensure undefined remains valueless.
*/
(function(window, document, undefined){

    // find all data js
    var module_array = document.querySelectorAll('[data-js-init]');

    // for each data attribue
    [].forEach.call(module_array, function (module) {

        // get module name
        var new_object = module.getAttribute('data-js-init');

        // start
        new window[new_object](module);

    });

})(this, document);
