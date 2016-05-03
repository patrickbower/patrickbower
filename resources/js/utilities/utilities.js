'use strict';

/**
* Simple XHR utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
function ajaxRequest (url, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            callback(request.responseText);
        }
    };

    request.send();
}

/**
* Simple HTML parser utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
function parseHTML (htmlString) {
    var html = document.implementation.createHTMLDocument("example");
    html.documentElement.innerHTML = htmlString;
    return html.body;
}
