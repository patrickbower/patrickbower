import * as utility from '../utilities/_utilities';

const defaults = {
    selectors: {
        model_window: 'js-model-template--window',
        model_close: 'js-model-template--close',
        model_active: 'model--active',
        model_content: 'js-model-template--content'
    }
}

/**
 * @class ModelWindow - Appended template element to body of ModelLaunch source page
 * with content taken from the target page via an ajax request.
 *
 * @extends {object} ModelLaunch
 */
export class ModelWindow {

    /**
     * @constructor
     * @param {object} the origin module that launches the model
     */
    constructor (ModelLaunch, properties = {}) {

        // dependency injection
        this.ModelLaunch = ModelLaunch;

        let members = Object.assign({}, defaults, properties);
        this.selectors = members.selectors;
    }

    /**
     * initalise
     *
     */
    init () {

        this.setPage();
        this.createModel(this.defineElements, this.bindEvents);
    }

    /**
    * Set page styling for takeover style model.
    *
    */
    setPage () {
        document.body.classList.add(this.selectors.model_active);
    }

    /**
    * Control functions that create model and setup page.
    *
    * @param {functionCallback} defineElements - Store created elements to instance.
    * @param {functionCallback} bindEvents - Bind events to created elements.
    */
    createModel (defineElements, bindEvents) {

        this.appendModel();
        this.defineElements();
        this.bindEvents();
        this.addContent();
    }

    /**
    * Append model to page.
    *
    */
    appendModel () {

        let create_model = document.createElement('div');
        create_model = this.ModelLaunch.modelWindowTemplate.parentNode.innerHTML;
        document.body.insertAdjacentHTML('afterbegin', create_model);
    }

    /**
    * Store created elements to instance.
    *
    */
    defineElements () {

        this.modelWindow = document.querySelector('.' + this.selectors.model_window);
        this.closeButton = this.modelWindow.querySelector('.' + this.selectors.model_close);
        this.modelContent = this.modelWindow.querySelector('.' + this.selectors.model_content);
    }

    /**
    * Bind events to created elements - Using a handleEvent object to configure the function call.
    *
    */
    bindEvents () {
        let instance = this;

        let close_button_event = {
            handleEvent: function(event) {
                event.preventDefault();
                instance.closeModel();
            }
        }

        this.closeButton.addEventListener('click', close_button_event);
    }

    /**
    * Get content via Ajax, place in model window and initalise.
    *
    * @requires {function} ajaxRequest
    * @requires {function} parseHTML
    */
    addContent () {
        let instance = this;

        // get parts from href string
        const [page_url, fragment_selector] = this.ModelLaunch.launchHref.split('#');

        // ajax util function
        utility.ajax(page_url, data => {

            // get fragment
            let html_fragment = data.querySelector('.' + fragment_selector);

            // place and initalise
            instance.modelContent.appendChild(html_fragment);
            utility.init(html_fragment);

        });
    }

    /**
    * Control functions that remove model and reset page
    *
    */
    closeModel () {
        this.removeModel();
        this.resetPage();
    }

    /**
    * Remove model HTML.
    *
    */
    removeModel () {
        this.modelWindow.parentNode.removeChild(this.modelWindow);
    }

    /**
    * Reset page styling.
    *
    */
    resetPage () {
        document.body.classList.remove(this.selectors.model_active);
    }
}
