import {parseHTML} from './parsehtml';

/**
* Simple XHR utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
export function ajax (url, callback) {

    let request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {

            let data = parseHTML(request.responseText);
            callback(data);
        }
    };

    request.send();
}
