/**
* Simple HTML parser utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
export function parseHTML (htmlString) {

    let html = document.implementation.createHTMLDocument("example");

    html.documentElement.innerHTML = htmlString;
    return html.body;
}
