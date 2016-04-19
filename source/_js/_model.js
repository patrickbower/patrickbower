'use strict';

var Model = function(module) {
    return this;
}

Model.prototype.launch = function() {

    event.preventDefault();

    console.log('do stuff', this);
}
