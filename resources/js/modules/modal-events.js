import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        modal: 'modal'
    }
}

/**
 * Default modal events
 *
 * @module ModalEvents
 * @class ModalEvents
 */
export class ModalEvents {

    /**
     * @constructor
     * @param {object}
     */
    constructor (properties = {}) {

        let members = Object.assign({}, defaults, properties);
        this.element = members.element;
        this.selectors = members.selectors;

    }

    /**
     * Initalise module
     *
     * @function init
     */
    init () {
        console.log('modal-events');
    }
}
