/**
 * Dependencies
 */
import {modules} from '../modules/_modules';

/**
* Initalising via data attributes.
*
* @function init
* @param {object} context - HTML Fragment to initalise.
*/
export function init (context) {

    // find all data js
    let js_modules = context.querySelectorAll('[data-init]');

    // for each occurance
    Array
        .from(js_modules)
        .forEach(element => {

            // get class name
            const js_class = element.getAttribute('data-init');

            const properties = {};
            properties.element = element;

            // instantiate
            const module_instance = new modules[js_class](properties);
            module_instance.init();
        });

}
