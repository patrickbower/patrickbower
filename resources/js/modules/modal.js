import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        template: 'js-modal-template',
        // modal_listener: 'js-modal-listener',
        open_button: 'js-modal-open',
        modal: 'modal'
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
        this.getTemplate();
        this.setTemplate();
        this.bindEvents();
    }

    /**
     * Find and store the template from the template element.
     *
     * @function getTemplate
     */
    getTemplate () {
        this.modalTemplate = document.querySelector('#' + this.selectors.template).innerHTML;
    }

    /**
     * Add modal template into the HTML ready to used.
     *
     * @function setTemplate
     */
    setTemplate () {
        document.body.insertAdjacentHTML('beforeend', this.modalTemplate);
        this.modal = document.querySelector('.' + this.selectors.modal);
    }

    /**
     * Add the events to start the modal up
     *
     * @function bindEvents
     */
    bindEvents () {
        let instance = this;

        let open_modal_event = {
            handleEvent(event) {

                event.preventDefault();

                if (event.target.classList.contains(instance.selectors.open_button)) {

                    instance.button = event.target;

                    instance.getHash();
                    instance.setHash();
                    instance.fetch();
                }

            }
        }

        // event delagation
        this.element.addEventListener('click', open_modal_event);
    }

    /**
     * Store the hash from the data atribute
     * on the start element (button).
     *
     * @function getHash
     */
    getHash () {
        this.hash = this.button.getAttribute('data-modal');
    }

    /**
     * Put hash into modal id first then
     * append the hash to the URL to activate
     * the CSS :target property on the modal.
     *
     * @function setHash
     */
    setHash () {
        this.modal.setAttribute('id', this.hash);
        window.location.hash = this.hash;
    }

    /**
     * Get modal content via Ajax
     *
     * @function fetch
     */
     fetch () {
        this.href = this.button.href;
     }
}
