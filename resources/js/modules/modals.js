import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        template: 'js-modal-template',
        open_button: 'js-modal-open',
        close_button: 'js-modal-close',
        fragment_selector: 'js-ajax',
        modal: 'js-modal-window',
        modal_content: 'js-modal-content'
    }
}

/**
 * Default modal
 *
 * @module Modal
 * @class Modal
 */
export class Modals {

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
        this.defineElements();
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
        document.body.insertAdjacentHTML('afterbegin', this.modalTemplate);
    }

    defineElements() {
        this.modal = document.querySelector('.' + this.selectors.modal);
        this.modalContent = this.modal.querySelector('.' + this.selectors.modal_content);
    }

    /**
     * Add the events to start the modal up
     *
     * @function bindEvents
     */
    bindEvents () {
        let instance = this;

        // hash change
        let hash_change = {
            handleEvent(event) {

                if (window.location.hash) {
                    instance.launchModal();
                } else {
                    instance.closeModal();
                }
            }
        }

        window.addEventListener('hashchange', hash_change);
    }

    launchModal(){
        this.displayModal();
        this.getScrollPosition();
        this.fetch(this.findURL(window.location.hash));
    }

    closeModal() {
        this.hideModal();
        this.setScrollPosition();
        this.removeModalContents();
    }

    displayModal() {
        this.modal.classList.add('active');
    }

    hideModal() {
        this.modal.classList.remove('active');
    }

    getScrollPosition() {
        this.scrollPosition = document.body.scrollTop;
    }

    setScrollPosition() {
        document.body.scrollTop = this.scrollPosition;
    }

    findURL(hash) {
        let modal_name = hash.substring(1);
        let launch_button = document.querySelector(`[data-modal="${modal_name}"]`);

        return launch_button.getAttribute('href');
    }

    fetch (href) {
        utility.ajax(href, data => {

            let html = data.querySelector('#' + this.selectors.fragment_selector);
            this.addContent(html);
        });
    }

    addContent(html) {
        this.modalContent.appendChild(html);
        utility.init(html);
    }

    removeModalContents() {
        this.modalContent.innerHTML = "";
    }

}
