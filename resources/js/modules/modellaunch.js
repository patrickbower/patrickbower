'use strict';

/**
 * @class ModelLaunch - Setup and get params from source markup ready to launch model.
 *
 * @requires {object} ModelWindow.
 * @requires {function} layout.
 */

import {ModelWindow} from '../modules/modelwindow';
import {breakpoint} from '../utilities/breakpoint';

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
        this.getLayout();
        this.storeTemplate();
        this.bindEvents();
    };

    /**
     * Model should only be shown for desktop - mobile should link to page
     *
     */
    getLayout () {

        let layout = breakpoint();

        if (layout.value === 'mobile' || layout.value === 'tablet') {
            this.modelLayout = false;
        } else {
            this.modelLayout = true;
        }
    }

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

        // check breakpoint on window resize
        let window_resize_event = {
            handleEvent: function(event) {
                instance.getLayout();
            }
        }

        window.addEventListener('resize', window_resize_event);


        // launch via button
        let launch_button_event = {
            handleEvent: function(event) {

                // link directly to page
                if (instance.modelLayout === false) {
                    return;

                // or display in model
                } else {
                    event.preventDefault();
                    instance.createModel();
                }
                
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
