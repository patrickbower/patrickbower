'use strict';

/*
Coding Standards - code convensions

• Open brances on same line.
• Whitespace before braces and brakets of functions.
• Capitalize first letter for constructor functions.
• Varabules all lowercase with underscores for word breaks unless global or values not changing and then all caps.
• Private Varabules start with an underscore.
*/

// UTIL - ES6 module patteren please!

// capitalize first letter of a string
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
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
