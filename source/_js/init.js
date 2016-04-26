'use strict';

// UTIL
// ADD ES6 module patteren please!

// capitalize first letter of a string
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function elementHasClass (className) {
    return event.currentTarget.classList.contains(className);
}

// INIT
// after page load
window.onload = function () {

    // find all data js
    var module_array = document.querySelectorAll('[data-js-init]');

    // for each data attribue
    [].forEach.call(module_array, function (module) {

        // get js module name
        var new_object = module.getAttribute('data-js-init').capitalizeFirstLetter();

        // start
        new window[new_object](module);

    });
};
