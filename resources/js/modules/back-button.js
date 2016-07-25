import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        button: 'js-back-button'
    }
}

/**
 * Replicate native back button functionality
 *
 * @module BackButton
 * @class BackButton
 */
export class BackButton {

    /**
     * @constructor
     * @param {object} properties
     */
    constructor(properties = {}) {

        let members = Object.assign({}, defaults, properties);

        this.element = members.element;
        this.selectors = members.selectors;
    }

    /**
     * Initalise and setup at runtime.
     *
     * @function init
     */
    init () {
        this.bindEvents();
    }

    /**
     * Add event handlers.
     *
     * @function bindEvents
     */
    bindEvents () {
        let instance = this;

        let go_back_one_event = {
            handleEvent: function(event) {
                event.preventDefault();
                instance.goBackOnePage();
            }
        }

        let button = document.querySelector('.' + this.selectors.button);
        button.addEventListener('click', go_back_one_event);
    }

    /**
     * Go back in history and use previous page position
     *
     * @function goBackOnePage
     */
    goBackOnePage () {
        window.history.back();
    }
}
