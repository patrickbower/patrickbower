import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        open_button: 'js-modal-open'
    }
}

/**
 * Default modal
 *
 * @module Modal
 * @class Modal
 */
export class Modal {

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
     * Initalise functions
     *
     * @function init
     */
    init () {
        this.bindEvents();
    }

    /**
     * Add the events to start the modal up
     *
     * @function bindEvents
     */
    bindEvents () {
        let instance = this;

        // open
        let open_modal_event = {
            handleEvent(event) {

                if (event.target.classList.contains(instance.selectors.open_button)) {

                    event.preventDefault();
                    window.location.hash = event.target.getAttribute('data-modal');
                }
            }
        }

        // open listener
        this.element.addEventListener('click', open_modal_event);
    }
}
