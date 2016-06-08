'use strict';

/**
 * Launches full page model.
 *
 * @constructor
 * @param {object} the origin module that launches the model
 */
class Model {
    constructor(context) {
        this.context = context;
    }

    init() {
        console.log(`hello ${this.context} constructor`);
    }
}

export default Model;
