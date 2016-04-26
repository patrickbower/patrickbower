'use strict';
/**
 * Launches full page model.
 *
 * @constructor
 * @param {object} the origin module that launches the model
 */
var LaunchModel = function (module) {
    this.originModule = module;
    this.bindEvents();
}
/**
 * Attach all events.
 *
 */
LaunchModel.prototype.bindEvents = function () {

    var launchButton = this.originModule.querySelector('.js-model__launch');
    launchButton.addEventListener('click', this);
}
/**
 * Handle all events.
 *
 * @param {event} event - Prevent default behavour.
 * @return {object} ModelTemplate - The appended model.
 */
LaunchModel.prototype.handleEvent = function (event) {
    event.preventDefault();

    new ModelTemplate ();
}
