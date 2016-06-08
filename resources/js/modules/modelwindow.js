'use strict';

// module dependencies
import {ajaxRequest} from '../utilities/ajax';
import {parseHTML} from '../utilities/parsehtml';

/**
 * ModelWindow - Appended template element to body of ModelLaunch source page
 * with content taken from the target page via an ajax request.
 *
 * @class ModelWindow
 * @extends ModelLaunch
 */
export class ModelWindow {

    /**
     * Launches full page model.
     *
     * @constructor
     * @param {object} the origin module that launches the model
     */
    constructor (ModelLaunch) {

        // dependency injection
        this.ModelLaunch = ModelLaunch;
    };

    /**
     * initalise
     *
     */
    init () {

        // selectors
        this.selector = {
            'model-window': 'js-model-template__window',
            'model-close': 'js-model-template__close',
            'model-active': 'model__active',
            'model-content': 'js-model-template__content'
        }

        // go to work
        this.setPage();
        this.createModel(this.defineElements, this.bindEvents);
    };

    /**
    * Set page styling for takeover style model.
    *
    */
    setPage () {
        document.body.classList.add(this.selector['model-active']);
    };

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
    };

    /**
    * Append model to page.
    *
    */
    appendModel () {

        var create_model = document.createElement('div');
        create_model = this.ModelLaunch.modelWindowTemplate.parentNode.innerHTML;
        document.body.insertAdjacentHTML('afterbegin', create_model);
    };

    /**
    * Store created elements to instance.
    *
    */
    defineElements () {

        this.modelWindow = document.querySelector('.' + this.selector['model-window']);
        this.closeButton = this.modelWindow.querySelector('.' + this.selector['model-close']);
        this.modelContent = this.modelWindow.querySelector('.' + this.selector['model-content']);
    };

    /**
    * Bind events to created elements - Using a handleEvent object to configure the function call.
    *
    */
    bindEvents () {
        var instance = this;

        var close_button_event = {
            handleEvent: function(event) {
                event.preventDefault();
                instance.closeModel();
            }
        }

        this.closeButton.addEventListener('click', close_button_event);
    };

    /**
    * Get content via Ajax and place in model window.
    *
    */
    addContent () {
        var instance = this;

        // get parts from href string
        var full_url = this.ModelLaunch.launchHref.split('#');
        var page_url = full_url[0];
        var fragment_selector = full_url[1];

        // ajax (util function)
        ajaxRequest(page_url, function(data){

            // parse (util function), and append
            var html = parseHTML(data);
            var html_fragment = html.querySelector('.' + fragment_selector);

            instance.modelContent.appendChild(html_fragment);
        });
    };

    /**
    * Control functions that remove model and reset page
    *
    */
    closeModel () {
        this.removeModel();
        this.resetPage();
    };

    /**
    * Remove model HTML.
    *
    */
    removeModel () {
        this.modelWindow.parentNode.removeChild(this.modelWindow);
    };

    /**
    * Reset page styling.
    *
    */
    resetPage () {
        document.body.classList.remove(this.selector['model-active']);
    };
}
