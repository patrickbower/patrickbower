'use strict';
/**
 * Builds full page model from template in HTML.
 *
 * @constructor
 * @this {ModelTemplate}
 */
var ModelTemplate = function () {
    this.create();
    this.addEvents();
}
/**
 * Append model to page.
 *
 */
ModelTemplate.prototype.create = function () {

    /** @class module html */
    this.module = document.querySelector('[data-model-template="template"]');

}
/**
 * Attach all events.
 *
 */
ModelTemplate.prototype.addEvents = function () {
    var module = this.module;

    /**
     * Attach close event to html.
     *
     * @event click
     * @fires Model#handleEvent
     */
    var closeButton = module.content.querySelector('[data-model-template="close"]');
    closeButton.addEventListener('click', this);
}
/**
 * Handle all events.
 *
 * @param {event} detemine the event type and origin
 * @listens ModelTemplate#addEvents
 */
ModelTemplate.prototype.handleEvents = function (event) {
    event.preventDefault();
    console.log(event);
}
