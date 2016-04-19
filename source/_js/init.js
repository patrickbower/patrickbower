'use strict';

// UTIL - ES6 module patteren please!

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// INIT

// after page load
window.onload = function() {

    // find all data js
    var moduleArray = document.querySelectorAll('[data-js-init]');

    // for each data attribue
    [].forEach.call(moduleArray, function(module) {

        // get js module name
        var newObject = module.getAttribute('data-js-init').capitalizeFirstLetter();

        // create and return new object
        var instance = new window[newObject]();

        // get modules data attribues
        var elementArray = module.querySelectorAll('[data-model]');

        // for each one found
        [].forEach.call(elementArray, function(element) {

            // break into componant parts
            var split = element.dataset.model.split('--');

            // get the event type to trigger
            var eventType = split[0].toString();

            // get function to invoke
            var functionName = split[1].toString();

            // create the event listener
            element.addEventListener([eventType], function(){
                instance[functionName]();
            });

        });

    });
}
