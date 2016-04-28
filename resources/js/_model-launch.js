'use strict';
/**
 * Launches full page model.
 *
 * @constructor
 * @param {object} the origin module that launches the model
 */
var LaunchModel = function (module) {

    // selectors
    this.selector = {
        'launch-button': 'js-model__launch',
        'model-template': 'js-model-template',
        'model-window': 'js-model-template__window',
    }

    this.originModule = module;
    this.storeTemplate()
    this.bindEvents();
}

/**
 * Fetch and keep model template in memory.
 *
 */
LaunchModel.prototype.storeTemplate = function () {

    var module_template = document.querySelector('#' + this.selector['model-template']);
    this.modelWindowTemplate = module_template.content.querySelector('.' + this.selector['model-window']);
}

/**
 * Attach all events.
 *
 */
LaunchModel.prototype.bindEvents = function () {
    var instance = this;

    var launch_button_event = {
        handleEvent: function(event) {
            event.preventDefault();
            instance.createModel();
        }
    }

    this.launchButton = this.originModule.querySelector('.' + this.selector['launch-button']);
    this.launchButton.addEventListener('click', launch_button_event);
}

/**
 * Create a model.
 *
 * @return {object} ModelTemplate - The appended model.
 */
LaunchModel.prototype.createModel = function () {

    this.launchHref = this.launchButton.href;
    new ModelTemplate (this);
}
