'use strict';

// utils
import {capitalise} from './util/capitalise.js';

// modules
import Model from './modules/model.js';

var modules = {
    Model: Model
};

/**
* Initalize requiried JS from data attribures found in page HTML.
*
* @constructor
* @param {object} window - Global object referance.
* @param {object} document - Document object referance.
* @param {object} undefined - Ensure undefined remains valueless.
*/
(function(window, document, undefined) {

    // find all data js
    var module_array = document.querySelectorAll('[data-js-init]');

    // for each data attribue
    [].forEach.call(module_array, function (module) {

        // get class name
        var className = capitalise(module.getAttribute('data-js-init'));

        console.log('className', className);

        // start
        var moduleInstance = new modules[className](module);

        moduleInstance.init();

    });

})(window, document);
