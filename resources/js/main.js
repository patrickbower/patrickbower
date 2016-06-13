'use strict';

// init modules
import {ModelLaunch} from './modules/model-launch';
import {ContactForm} from './modules/contact-form';

// init class list
var modules = {
    model: ModelLaunch,
    contact: ContactForm
};


/**
* Initalize requiried JS from data attribures found in page HTML.
*
* @param {object} window - Global object referance.
* @param {object} document - Document object referance.
* @param {object} undefined - Ensure undefined remains valueless.
*/
(function(window, document, undefined) {

    // find all data js
    const moduleArray = document.querySelectorAll('[data-init]');

    // for each data attribue
    Array
        .from(moduleArray)
        .forEach(module => {
            // get class name
            const className = module.getAttribute('data-init');

            // instantiate
            const moduleInstance = new modules[className](module);
            moduleInstance.init();
        });

})(window, document);
