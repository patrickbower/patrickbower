'use strict';
/**
 * Launches full page model.
 *
 * @constructor
 * @this {Model}
 * @param {object} the origin module that launches the model
 */
var Model = function (module) {

    /** @class module html */
    this.module = module;

    /** set up events */
    this.addEvents();
}
/**
 * Attach all events.
 *
 */
Model.prototype.addEvents = function () {

    var module = this.module;

    /**
     * Attach launch event to html.
     *
     * @event click
     * @fires Model#handleEvent
     */
    var launchButton = module.querySelector('[data-model="launch"]');
    launchButton.addEventListener('click', this);
}
/**
 * Handle all events.
 *
 * @param {event} stop default behavour and check event type and origin
 * @listens Model#addEvents
 */
Model.prototype.handleEvent = function (event) {
    event.preventDefault();

    console.log(this);
}
