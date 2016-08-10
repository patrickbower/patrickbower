import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        template: 'js-modal-template',
        modal_parent: 'js-modal-parent',
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
     * Initalise module
     *
     * @function init
     */
    init () {
        this.getTemplate();
        this.setTemplate();
        this.bindStartEvents();
    }

    /**
     * getTemplate
     *
     * @function getTemplate
     */
    getTemplate () {
        this.modalTemplate = document.querySelector('#' + this.selectors.template).innerHTML;
    }

    /**
     * setTemplate
     *
     * @function setTemplate
     */
    setTemplate () {
        document.body.insertAdjacentHTML('beforeend', this.modalTemplate);
        this.modal = document.querySelector('.' + this.selectors.modal);
    }

    /**
     * bindStartEvents
     *
     * @function bindStartEvents
     */
    bindStartEvents () {
        let instance = this;

        let open_modal_event = {
            handleEvent(event) {

                event.preventDefault();

                if (event.target.classList.contains(instance.selectors.open_button)) {

                    instance.button = event.target;

                    instance.getHash();
                    instance.setHash();
                }

            }
        }

        let modalParent = document.querySelector('.' + this.selectors.modal_parent);
        modalParent.addEventListener('click', open_modal_event);

    }

    /**
     * getHash
     *
     * @function getHash
     */
    getHash () {
        this.hash = this.button.getAttribute('data-modal');
    }

    /**
     * setHash
     *
     * @function setHash
     */
    setHash () {
        // this.modal.setAttribute('id', this.hash);
        window.location.hash = this.hash;
    }

    /**
     * Get modal content via Ajax
     *
     * @function getModalContents
     */
    //  getModalContents () {
    //      console.log('getModalContents');
    //  }
}
