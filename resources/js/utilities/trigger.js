/**
* Trigger cutom javasctipt events
*
* @param {object} element
* @param {string} eventName
* @param {object} props
*/

export function trigger(element, eventName, props) {

    let event = new CustomEvent(eventName, {
        'detail': props
    });

    element.dispatchEvent(event);
}
