/**
 * Dependencies
 */
import * as utility from '../utilities/_utilities';
import {ModelWindow} from './model-window';

/**
 * Module settings
 */
 const defaults = {
    selectors: {
        launch_button: 'js-model--launch',
        model_template: 'js-model-template',
        model_window: 'js-model-template--window',
    }
}

/**
 * Setup and get params from source markup ready to launch model.
 *
 * @module Model Launch
 * @class ModelLaunch
 */
export class ModelLaunch {

    /**
     * Launches full page model.
     *
     * @constructor
     * @param {object} the origin module that launches the model
     */
    constructor (context) {
        this.context = context;
    };

    /**
     * initalise
     *
     */
    init () {

        // set defaults
        this.modelLayout = false;

        // setup
        this.getLayout();
        this.storeTemplate();
        this.bindEvents();
    };

    /**
     * Model should only be shown for desktop - mobile should link to page
     *
     * @requires {function} breakpoint
     */
    getLayout () {

        let layout = utility.breakpoint();
        if (layout.value === 'desktop') this.modelLayout = true;
    }

    /**
     * Fetch and keep model template in memory.
     *
     */
    storeTemplate () {

        let module_template = document.querySelector('#' + defaults.selectors.model_template);
        this.modelWindowTemplate = module_template.content.querySelector('.' + defaults.selectors.model_window);
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

        this.launchButton = this.context.querySelector('.' + defaults.selectors.launch_button);
        this.launchButton.addEventListener('click', launch_button_event);

    };

    /**
     * Create a model.
     *
     * @requires {object} ModelWindow.
     */
    createModel () {

        // url and id
        this.launchHref = this.launchButton.href;

        // create new model
        let moduleInstance = new ModelWindow(this);
        moduleInstance.init();
    };
}
