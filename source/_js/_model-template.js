'use strict';

/**
 * Builds full page model from template in HTML.
 *
 * @constructor
 */
var ModelTemplate = function () {

    // selectors
    this.selector = {
        close : 'js-model-template__close'
    }

    // get template parts
    var module_template = document.querySelector('#js-model-template');
    this.modelWindowTemplate = module_template.content.querySelector('.js-model-template__window');

    // go to work
    this.createModel(this.defineElements, this.bindEvents);
}

/**
 * Model controller.
 *
 * @param {functionCallback} defineElements - Store created elements to instance.
 * @param {functionCallback} bindEvents - Bind events to created elements.
 */
ModelTemplate.prototype.createModel = function (defineElements, bindEvents) {

    // add model to page
    this.appendModel();

    // callbacks on model
    this.defineElements();
    this.bindEvents();
}

/**
 * Append model to page.
 *
 */
ModelTemplate.prototype.appendModel = function () {

    var create_model = document.createElement('div');
    create_model = this.modelWindowTemplate.parentNode.innerHTML;
    document.body.insertAdjacentHTML('afterbegin', create_model);
}

/**
 * Store created elements to instance.
 *
 */
ModelTemplate.prototype.defineElements = function () {

    this.modelWindow = document.querySelector('.js-model-template__window');
    this.closeButton = this.modelWindow.querySelector('.js-model-template__close');
}

/**
 * Bind events to created elements.
 *
 */
ModelTemplate.prototype.bindEvents = function () {

    // close button
    this.closeButton.addEventListener('click', this);
}

/**
 * Handle events.
 *
 * @param {object} event - To prevent any default behaviour, detemine origin of event and/or the event type.
 */
ModelTemplate.prototype.handleEvent = function (event) {
    event.preventDefault();

    // close button
    if (elementHasClass(this.selector.close)) this.closeModel();

}

/**
 * Close model.
 *
 */
ModelTemplate.prototype.closeModel = function () {
    this.modelWindow.parentNode.removeChild(this.modelWindow);
}
