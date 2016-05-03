'use strict';

/**
* Builds full page model from template stored on current page.
*
* @constructor
* @param {LaunchModel} LaunchModel class - Dependency injection.
*/
var ModelTemplate = function (LaunchModel) {

    // dependency injection class
    this.LaunchModel = LaunchModel;

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

    this.appendModel();
    this.defineElements();
    this.bindEvents();
    this.addContent();
}

/**
* Append model to page.
*
*/
ModelTemplate.prototype.appendModel = function () {

    var create_model = document.createElement('div');
    create_model = this.LaunchModel.modelWindowTemplate.parentNode.innerHTML;
    document.body.insertAdjacentHTML('afterbegin', create_model);
}

/**
* Store created elements to instance.
*
*/
ModelTemplate.prototype.defineElements = function () {

    this.modelWindow = document.querySelector('.' + this.selector['model-window']);
    this.closeButton = this.modelWindow.querySelector('.' + this.selector['model-close']);
    this.modelContent = this.modelWindow.querySelector('.' + this.selector['model-content']);
}

/**
* Bind events to created elements - Using a handleEvent object to configure the function call.
*
*/
ModelTemplate.prototype.bindEvents = function () {
    var instance = this;

    var close_button_event = {
        handleEvent: function(event) {
            event.preventDefault();
            instance.closeModel();
        }
    }

    this.closeButton.addEventListener('click', close_button_event);
}

/**
* Get content via Ajax and place in model window.
*
*/
ModelTemplate.prototype.addContent = function () {
    var instance = this;

    // get parts from href string
    var full_url = this.LaunchModel.launchHref.split('#');
    var page_url = full_url[0];
    var fragment_selector = full_url[1];

    // ajax (util function)
    ajaxRequest(page_url, function(data){

        // parse (util function), and append
        var html = parseHTML(data);
        var html_fragment = html.querySelector('.' + fragment_selector);

        instance.modelContent.appendChild(html_fragment);
    });
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
