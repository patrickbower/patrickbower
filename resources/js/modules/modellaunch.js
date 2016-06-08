'use strict';

/**
 * @class ModelLaunch - Setup and get params from source markup ready to launch model
 *
 * @requires ModelWindow
 */

import {ModelWindow} from '../modules/modelwindow';

export class ModelLaunch {

    /**
     * Launches full page model.
     *
     * @constructor
     * @param {object} the origin module that launches the model
     */
    constructor (context) {
        // module markup
        this.context = context;
    };

    /**
     * initalise
     *
     */
    init () {

        // selectors
        this.selector = {
            'launch-button': 'js-model__launch',
            'model-template': 'js-model-template',
            'model-window': 'js-model-template__window',
        }

        // setup
        this.storeTemplate();
        this.bindEvents();
    };

    /**
     * Fetch and keep model template in memory.
     *
     */
    storeTemplate () {

        let module_template = document.querySelector('#' + this.selector['model-template']);
        this.modelWindowTemplate = module_template.content.querySelector('.' + this.selector['model-window']);
    };

    /**
     * Add event handlers.
     *
     */
    bindEvents () {
        let instance = this;

        let launch_button_event = {
            handleEvent: function(event) {
                event.preventDefault();
                instance.createModel();
            }
        }

        this.launchButton = this.context.querySelector('.' + this.selector['launch-button']);
        this.launchButton.addEventListener('click', launch_button_event);
    };

    /**
     * Create a model.
     *
     * @return {object} ModelTemplate - The appended model.
     */
    createModel () {

        // url and id
        this.launchHref = this.launchButton.href;

        // create new model
        let moduleInstance = new ModelWindow(this);
        moduleInstance.init();
    };
}
