import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        template: 'js-modal-template',
        start_button: 'js-modal-start',
        modal: 'modal'
    }
}

/**
 *
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

        let start_modal_event = {
            handleEvent(event) {
                event.preventDefault();
                let hash = instance.getHash(event.currentTarget);
                instance.setHash(hash);
            }
        }

        let startButtons = document.querySelectorAll('.' + this.selectors.start_button);
        Array.from(startButtons).forEach(button => {
            button.addEventListener('click', start_modal_event);
        });

        // CSS Stuff
        // <a href="#modal-2" data-stamp="#modal-2">
        //
        // [id^=modal-]:target
        // {
        //
        // }
        //
        // <div id="modal-content">
    }

    /**
     * getHash
     *
     * @function getHash
     */
    getHash (currentTarget) {
        return document.querySelector(`[data-stamp=${window.location.hash}]`);

        let [url, hash] = currentTarget.href.split('#');
        return hash;
    }

    /**
     * setHash
     *
     * @function setHash
     */
    setHash (hash) {
        this.modal.setAttribute('id', hash);
        window.location.hash = hash;
    }
}
