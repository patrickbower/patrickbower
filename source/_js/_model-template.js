'use strict';

/**
 * Builds full page model from template in HTML.
 *
 * @constructor
 */
var ModelTemplate = function () {

    // selectors
    this.selector = {
        'template': 'js-model-template',
        'template-window': 'js-model-template__window',
        'close': 'js-model-template__close',
        'model-active': 'model__active'
    }

    // get template parts
    var module_template = document.querySelector('#' + this.selector['template']);
    this.modelWindowTemplate = module_template.content.querySelector('.' + this.selector['template-window']);

    // go to work
    this.setPage();
    this.createModel(this.defineElements, this.bindEvents);
}

/**
 * Set page styling for takeover style model.
 *
 */
ModelTemplate.prototype.setPage = function () {
    document.body.classList.add(this.selector['model-active']);
}

/**
 * Control functions that create model and setup page.
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

    this.modelWindow = document.querySelector('.' + this.selector['template-window']);
    this.closeButton = this.modelWindow.querySelector('.' + this.selector['close']);
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
    if (elementHasClass(this.selector['close'])) this.closeModel();

}

/**
 * Control functions that remove model and reset page
 *
 */
ModelTemplate.prototype.closeModel = function () {
    this.removeModel();
    this.resetPage();
}

/**
 * Remove model HTML.
 *
 */
ModelTemplate.prototype.removeModel = function () {
    this.modelWindow.parentNode.removeChild(this.modelWindow);
}

/**
 * Reset page styling.
 *
 */
ModelTemplate.prototype.resetPage = function () {
    document.body.classList.remove(this.selector['model-active']);
}
