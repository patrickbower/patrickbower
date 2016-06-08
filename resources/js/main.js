'use strict';

// init modules
import {ModelLaunch} from './modules/modellaunch';

// init class list
var modules = {
    model: ModelLaunch
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
    var module_array = document.querySelectorAll('[data-init]');

    // for each data attribue
    [].forEach.call(module_array, function (module) {

        // get class name
        var className = module.getAttribute('data-init');

        // instantiate
        var moduleInstance = new modules[className](module);
        moduleInstance.init();

    });

})(window, document);
