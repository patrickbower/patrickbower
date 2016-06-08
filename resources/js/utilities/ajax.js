'use strict';

/**
* Simple XHR utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
export function ajaxRequest (url, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            callback(request.responseText);
        }
    };

    request.send();
}
