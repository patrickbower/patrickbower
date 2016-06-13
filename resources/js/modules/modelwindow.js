'use strict';

/**
 * @class ModelWindow - Appended template element to body of ModelLaunch source page
 * with content taken from the target page via an ajax request.
 *
 * @extends {object} ModelLaunch
 * @requires {function} ajaxRequest
 * @requires {function} parseHTML
 */

import {ajaxRequest} from '../utilities/ajax';
import {parseHTML} from '../utilities/parsehtml';

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

        let create_model = document.createElement('div');
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
        let instance = this;

        let close_button_event = {
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
    * @requires {function} ajaxRequest
    * @requires {function} parseHTML
    */
    addContent () {
        let instance = this;

        // get parts from href string
        let full_path = this.ModelLaunch.launchHref.split('#');
        let page_url = full_path[0];
        let fragment_selector = full_path[1];

        // ajax (util function)
        ajaxRequest(page_url, function(data){

            // parse (util function), and append
            let html = parseHTML(data);
            let html_fragment = html.querySelector('.' + fragment_selector);

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
